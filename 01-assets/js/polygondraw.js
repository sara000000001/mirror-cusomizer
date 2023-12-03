

document.getElementById("finish").addEventListener("click", finishDrawing);
document.getElementById("start").addEventListener("click", startDrawing);
document.getElementById("clear").addEventListener("click", clearDrawing);
document.getElementById("edit").addEventListener("click", Edit);



let canvas = new fabric.Canvas("canvas", {
    width: "650",
    height: "600",
    selection: false
});

/*======================start  of image uploading ==================*/

document.getElementById("editImage").addEventListener("click", editImage);
document.getElementById("finshEditImage").addEventListener("click", finishEditImage);

// add the file input is added to preview image
var fileInput = document.getElementById('file-input');

var previewImage = document.getElementById('preview-image');
var imgInstance = {};
//var canvas = {};

fileInput.addEventListener('change', event => {
    if (event.target.files.length > 0) {
        previewImage.src = URL.createObjectURL(
            event.target.files[0]);

        previewImage.style.display = 'none';
    }
    // add image to canva=======================================        

    var imgElement = document.getElementById('my-image');
    imgElement.src = previewImage.src;

    imgInstance = new fabric.Image(imgElement, {
        stroke: "black",
        strokeWidth: 2,
        evented: false,
        selectable: false,
        opacity: 0.1
    });



});

function editImage() {
    canvas.remove(imgInstance);
    imgInstance.setOptions({
        stroke: "green",
        strokeWidth: 4,
        evented: true,
        selectable: true,
        opacity: 0.5

    });

    canvas.add(imgInstance);


    /* fabric.Object.prototype.transparentCorners = false;
     fabric.Object.prototype.cornerColor = 'blue';
     fabric.Object.prototype.cornerStyle = 'circle';
     canvas2.add(imgInstance);*/
}

function finishEditImage() {
    imgInstance.setOptions({
        stroke: "red",
        strokeWidth: 2,
        evented: false,
        selectable: false,
        opacity: 0.98,
    });
    canvas.add(imgInstance);


}





/*======================end of image uploading ==================*/

points = [];

var prevPolygon;
var isDown;


function startDrawing() {
    isDown = true;
}


canvas.on("mouse:down", startAddingLine);

function startAddingLine(o) {
    if (isDown === true) {

        let pointer = canvas.getPointer(o.e);


        points.push(pointer);
        //console.log(points);
        canvas.remove(prevPolygon);

        prevPolygon = new fabric.Polygon(points, {
            fill: 'green',
            stroke: 'black',
            strokeWidth: 3,
            opacity: 0.2
        });

        // preview the polygon in canvas 
        canvas.add(prevPolygon);
    }

}

function finishDrawing() {
    var polygon = new fabric.Polygon(points, {
        fill: 'green',
        opacity: 0.85
    });
    canvas.remove(prevPolygon);
    canvas.add(polygon);
    console.log(points);
  
    isDown = false;
}


function clearDrawing() {
    points = [];
    canvas.clear();
}
//export points to be used in 3js


/*======================end of drawing tools==================*/


/*======================start of toggle editing polygon==================*/








// define a function that can locate the controls.
// this function will be used both for drawing and for interaction.
function polygonPositionHandler(dim, finalMatrix, fabricObject) {
    var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
        y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
        { x: x, y: y },
        fabric.util.multiplyTransformMatrices(
            fabricObject.canvas.viewportTransform,
            fabricObject.calcTransformMatrix()
        )
    );
}

function getObjectSizeWithStroke(object) {
    var stroke = new fabric.Point(
        object.strokeUniform ? 1 / object.scaleX : 1,
        object.strokeUniform ? 1 / object.scaleY : 1
    ).multiply(object.strokeWidth);
    return new fabric.Point(object.width + stroke.x, object.height + stroke.y);
}

// define a function that will define what the control does
// this function will be called on every mouse move after a control has been
// clicked and is being dragged.
// The function receive as argument the mouse event, the current trasnform object
// and the current position in canvas coordinate
// transform.target is a reference to the current object being transformed,
function actionHandler(eventData, transform, x, y) {
    var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
        polygonBaseSize = getObjectSizeWithStroke(polygon),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
            x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
            y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
        };
    polygon.points[currentControl.pointIndex] = finalPointPosition;
    return true;
}

// define a function that can keep the polygon in the same position when we change its
// width/height/top/left.
function anchorWrapper(anchorIndex, fn) {
    return function (eventData, transform, x, y) {
        var fabricObject = transform.target,
            absolutePoint = fabric.util.transformPoint({
                x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
            }, fabricObject.calcTransformMatrix()),
            actionPerformed = fn(eventData, transform, x, y),
            newDim = fabricObject._setPositionDimensions({}),
            polygonBaseSize = getObjectSizeWithStroke(fabricObject),
            newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
            newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        return actionPerformed;
    }
}

function Edit() {
    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.
    var poly = canvas.getObjects()[0];
    canvas.setActiveObject(poly);
    poly.edit = !poly.edit;
    if (poly.edit) {
        var lastControl = poly.points.length - 1;
        poly.cornerStyle = 'circle';
        poly.cornerColor = 'rgba(0,0,255,0.5)';
        poly.controls = poly.points.reduce(function (acc, point, index) {
            acc['p' + index] = new fabric.Control({
                positionHandler: polygonPositionHandler,
                actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                actionName: 'modifyPolygon',
                pointIndex: index
            });
            return acc;
        }, {});
    } else {
        poly.cornerColor = 'blue';
        poly.cornerStyle = 'rect';
        poly.controls = fabric.Object.prototype.controls;
    }
    poly.hasBorders = !poly.edit;
    canvas.requestRenderAll();
}
