/**
 * Created by genffy on 2016/11/4.
 */
console.log('test');
/*
var $canvas, HEIGHT, WIDTH, arrow_1, center, paper, radius, stroke;
$canvas = document.getElementById('arrows');
paper = Raphael($canvas, 500, 500);
WIDTH = 500;
HEIGHT = 500;
center = [WIDTH / 2, HEIGHT / 2];
radius = 230;
stroke = 5;

paper.customAttributes.arc = function(center_x, center_y, degrees, radius) {
    var arc_x, arc_y, path, radians;
    if (!radius) {
        return;
    }
    radians = (90 - degrees) * Math.PI / 180;
    arc_x = center_x + radius * Math.cos(radians);
    arc_y = center_y - radius * Math.sin(radians);
    path = [['M', center_x, center_y - radius], ['M', center_x, center_y - radius], ['A', radius, radius, 0, +(degrees > 180), 1, arc_x, arc_y]];
    return {
        path: path
    };
};
arrow_1 = paper.path();
arrow_1.node.setAttribute('class', 'arrow_1');
arrow_1.attr({
    arc: [center[0], center[1], 10, radius]
});
arrow_1.attr({ 'arrow-end': 'classic-wide-long', 'arrow-start': 'classic-wide-long' });
arrow_1.rotate(80, center[1], center[0]);
*/

Raphael.fn.connection = function (obj1, obj2, line, bg, arrow) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
            {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
            {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
            {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
            {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
            {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
            {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
            {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

$(function() {
    var paper = Raphael("arrows", 940, 738),
        connections = [],
        shapes = [
            // 横
            paper.rect(0, 10, 80, 40, 2),
            paper.rect(120, 10, 80, 40, 2),
            paper.rect(240, 10, 80, 40, 2), //1111

            paper.rect(360, 10, 80, 40, 2),
            // 竖
            paper.rect(120, 70, 80, 40, 2),// 1111

            // 空点
            paper.rect(199.5, 149, 1, 1, 0),

            paper.rect(160, 200, 80, 40, 2),
            // 空点
            paper.rect(199.5, 250, 1, 1, 2),

            paper.rect(160, 260, 80, 40, 2),
            paper.rect(160, 320, 80, 40, 2),
            paper.rect(160, 380, 80, 40, 2),
            paper.rect(160, 440, 80, 40, 2),
            paper.rect(160, 520, 80, 40, 2),
            // paper.rect(160, 600, 80, 40, 2),
            // 其他
            paper.rect(20, 200, 80, 40, 2),
            paper.rect(280, 230, 80, 40, 2),
        ];
    for (var i = 0, ii = shapes.length; i < ii; i++) {
        var color = Raphael.getColor();
        console.log(color);
        shapes[i].attr({fill: '#fff', stroke: '#000', "fill-opacity": 0, "stroke-width": 2, cursor: "pointer"});
        // shapes[i].drag(move, dragger, up);
    }

    paper.path("M160 110L160 149L280 149L280 50");
    // 链接
    connections.push(paper.connection(shapes[0], shapes[1], "#000", "#fff"));
    connections.push(paper.connection(shapes[3], shapes[2], "#000", "#fff"));

    connections.push(paper.connection(shapes[1], shapes[4], "#000", "#fff"));
    // connections.push(paper.connection(shapes[4], shapes[2], "#000", "#fff"));

    connections.push(paper.connection(shapes[5], shapes[6], "#000", "#fff"));
    // 折线
    connections.push(paper.connection(shapes[6], shapes[8], "#000", "#fff"));

    connections.push(paper.connection(shapes[8], shapes[9], "#000", "#fff"));
    connections.push(paper.connection(shapes[9], shapes[10], "#000", "#fff"));
    connections.push(paper.connection(shapes[10], shapes[11], "#000", "#fff"));
    connections.push(paper.connection(shapes[11], shapes[12], "#000", "#fff"));

    connections.push(paper.connection(shapes[13], shapes[6], "#000", "#fff"));
    connections.push(paper.connection(shapes[14], shapes[7], "#000", "#fff"));


});
