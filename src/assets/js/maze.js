function Maze(opt={}) {
  this.pointWidth = +opt.pointWidth || 5;
  this.col = 0;
  this.row = 0;
  this.pathPointNum = 0;
  this.openPoint = [];//打开的路
  this.mazePoints = [];
  this.mazePointsEl = [];
  this.WALK_COLOR = '#e6a23c';
  this.OPEN_WALL_COLOR = '#fff';
  this.BLOCK_WALL_COLOR = '#808080';
  this.PASS_WALL_COLOR = '#f00';
  this.walkSpeed = +opt.walkSpeed || 100;
};
Maze.prototype.createGrid = function (row, col) {
  this.row = row;
  this.col = col;
  this.mazePoints = [];

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      var point = null;
      if (i == 0 || j == 0 || (i & 1) == 0 || (j & 1) == 0) {
        point = 1;
      } else {
        point = 0;
        this.pathPointNum++;
      }
      this.mazePoints.push(point);
    }
  }
  this.makePath();
};
Maze.prototype.createPoint = function (can) {
  var point = document.createElement('div');
  point.style.width = this.pointWidth + 'px';
  point.style.height = this.pointWidth + 'px';
  point.style.float = 'left';
  point.style.display = 'inline-block';
  if (can) {
    point.style.background = this.BLOCK_WALL_COLOR
  }
  return point;
};

Maze.prototype.makePath = function () {
  var begin = this.col + 1;
  var openPoint = [];//打开的点
  var goPoint = [begin];//走过的点
  var goPointTemp = [begin];//走多的点 并且周围可能还有节点
  while (goPoint.length < this.pathPointNum) {
    if (begin == -1) {
      if (goPointTemp.length == 0) {
        break;
      } else {
        var goIndex = Math.ceil(Math.random() * goPointTemp.length) - 1;
        begin = goPointTemp[goIndex];//去哪里
      }
    }
    var rowIndex = Math.ceil((begin + 1) / this.col) - 1;
    var colIndex = begin % this.col;
    var up = begin - this.col * 2;
    var down = begin + this.col * 2;
    var left = begin - 2;
    var right = begin + 2;

    var pathCan = [];//可以走的路
    if (rowIndex > 1) {
      if (goPoint.indexOf(up) < 0) {
        pathCan.push(up);
      }
    }
    if (rowIndex < (this.row - 3)) {
      if (goPoint.indexOf(down) < 0) {
        pathCan.push(down);
      }
    }
    if (colIndex > 1) {
      if (goPoint.indexOf(left) < 0) {
        pathCan.push(left);
      }
    }
    if (colIndex < (this.col - 3)) {
      if (goPoint.indexOf(right) < 0) {
        pathCan.push(right);
      }
    }

    if (pathCan.length == 0) {
      goPointTemp.splice(goIndex, 1);
      begin = -1;
      continue;
    }

    var toGo = pathCan[Math.ceil(Math.random() * pathCan.length) - 1];//去哪里
    goPoint.push(toGo);
    goPointTemp.push(toGo);
    var kk = toGo - begin;
    if (kk == 2) {
      openPoint.push(toGo - 1);
    }
    if (kk == -2) {
      openPoint.push(toGo + 1);
    }
    if (kk > this.col) {
      openPoint.push(toGo - this.col);
    }
    if (kk < -this.col) {
      openPoint.push(toGo + this.col);
    }
    var bb = begin;
    begin = toGo;
    // console.log('begin:', bb, 'pathCan：', pathCan, 'toGo：', toGo, 'goPointLength', goPoint.length, "allLength", this.pathPointNum);
  }

  this.openPoint = openPoint;

};

Maze.prototype.show = function (el) {

  this.openPoint.forEach(function (item) {
    this.mazePoints[item] = 0;
  }.bind(this));

  this.mazePointsEl = this.mazePoints.map(function (item, index) {
    if (item == 1) {
      return this.createPoint(true)
    } else {
      return this.createPoint(false)
    }
  }.bind(this));

  var begin = this.col;
  var end = this.col * (this.row - 1) - 1;
  this.mazePointsEl[begin].style.background = this.WALK_COLOR;
  this.mazePointsEl[end].style.background = this.WALK_COLOR;

  var mazeBox = document.createElement('div');
  mazeBox.id = 'mazeBox';
  mazeBox.style.background = this.OPEN_WALL_COLOR;
  mazeBox.style.width = this.col * (+this.pointWidth) + 'px';
  this.mazePointsEl.forEach(function (point) {
    mazeBox.append(point);
  });
  el.innerHTML = '';
  el.append(mazeBox);
};

Maze.prototype.findPathWithAction = function () {
  var begin = this.col + 1;
  var end = this.col * (this.row - 1) - 2;
  var openPoint = this.openPoint;
  var walkPoint = [begin];//走过的点
  var goPoint = [begin];//走过的路 这里是打开的墙

  function oneWalk(begin) {
    setTimeout(function () {
      var up = begin - this.col;
      var down = begin + this.col;
      var left = begin - 1;
      var right = begin + 1;

      var pathCan = [];
      if (openPoint.indexOf(up) > -1 && walkPoint.indexOf(up - this.col) < 0) {
        pathCan.push(up)
      }
      if (openPoint.indexOf(down) > -1 && walkPoint.indexOf(down + this.col) < 0) {
        pathCan.push(down)
      }
      if (openPoint.indexOf(left) > -1 && walkPoint.indexOf(left - 1) < 0) {
        pathCan.push(left)
      }
      if (openPoint.indexOf(right) > -1 && walkPoint.indexOf(right + 1) < 0) {
        pathCan.push(right)
      }

      if (pathCan.length == 0) {
        var endWall = goPoint.pop();
        this.changeColor(endWall, this.PASS_WALL_COLOR);
        openPoint.splice(openPoint.indexOf(endWall), 1);//删除打开点，将路堵上
        this.changeColor(walkPoint.pop(), this.PASS_WALL_COLOR);
        begin = walkPoint[walkPoint.length - 1];
        return oneWalk.call(this, begin);
      }

      var toGo = pathCan[Math.ceil(Math.random() * pathCan.length) - 1];//去哪里

      goPoint.push(toGo);
      this.changeColor(toGo, this.WALK_COLOR);
      var kk = toGo - begin;
      walkPoint.push(toGo + kk);
      this.changeColor(toGo + kk, this.WALK_COLOR);

      var bb = begin;
      begin = toGo + kk;
      // console.log('begin:', bb, 'pathCan：', pathCan, 'toGo：', toGo, 'goPointLength', goPoint.length, "allLength", this.pathPointNum);
      if ((toGo + kk) != end) {
        return oneWalk.call(this, begin)
      }
    }.bind(this), this.walkSpeed);
  }

  oneWalk.call(this, begin);
};

Maze.prototype.findPath = function () {
  var begin = this.col + 1;
  var end = this.col * (this.row - 1) - 2;
  var openPoint = this.openPoint;
  var walkPoint = [begin];//走过的点
  var goPoint = [begin];//走过的路 这里是打开的墙

  while (true) {

    var up = begin - this.col;
    var down = begin + this.col;
    var left = begin - 1;
    var right = begin + 1;

    var pathCan = [];
    if (openPoint.indexOf(up) > -1 && walkPoint.indexOf(up - this.col) < 0) {
      pathCan.push(up)
    }
    if (openPoint.indexOf(down) > -1 && walkPoint.indexOf(down + this.col) < 0) {
      pathCan.push(down)
    }
    if (openPoint.indexOf(left) > -1 && walkPoint.indexOf(left - 1) < 0) {
      pathCan.push(left)
    }
    if (openPoint.indexOf(right) > -1 && walkPoint.indexOf(right + 1) < 0) {
      pathCan.push(right)
    }

    if (pathCan.length == 0) {
      var endWall = goPoint.pop();
      this.changeColor(endWall, this.OPEN_WALL_COLOR);
      openPoint.splice(openPoint.indexOf(endWall), 1);//删除打开点，将路堵上
      this.changeColor(walkPoint.pop(), this.OPEN_WALL_COLOR);
      begin = walkPoint[walkPoint.length - 1];
      continue;
    }

    var toGo = pathCan[Math.ceil(Math.random() * pathCan.length) - 1];//去哪里

    goPoint.push(toGo);
    this.changeColor(toGo, this.WALK_COLOR);
    var kk = toGo - begin;
    walkPoint.push(toGo + kk);
    this.changeColor(toGo + kk, this.WALK_COLOR);

    var bb = begin;
    begin = toGo + kk;

    if ((toGo + kk) == end) {
      break;
    }
    // console.log('begin:', bb, 'pathCan：', pathCan, 'toGo：', toGo, 'goPointLength', goPoint.length, "allLength", this.pathPointNum);
  }
};

Maze.prototype.changeColor = function (index, color) {
  var mazeBox = document.getElementById('mazeBox');
  var childrenNodes = mazeBox.childNodes;
  childrenNodes[index].style.background = color;
};

function test() {
  var maze = new Maze();
  maze.createGrid(57, 57);
  maze.show(document.body);
  maze.findPathWithAction();
}

// test();


export {
  Maze
}
