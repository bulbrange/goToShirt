'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

var _sqlite = require('sqlite');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _resolvers = require('./data/resolvers');

var _schema = require('./data/schema');

var _mocks = require('./data/mocks');

var _mocks2 = _interopRequireDefault(_mocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var request = require('request');
var Jimp = require('jimp');
var fs = require('fs');
var rimraf = require('rimraf');

var dbPromise = _sqlite2.default.open('./goToShirt.sqlite', { Promise: Promise });
var PORT = 8888;

var startServer = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var server, app;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            server = new _apolloServerExpress.ApolloServer({ typeDefs: _schema.typeDefs, resolvers: _resolvers.resolvers });
            app = (0, _express2.default)();


            server.applyMiddleware({ app: app });
            app.use(_express2.default.static('server/public'));
            app.set('view engine', 'ejs');

            app.get('/favicon.ico', function (req, res) {
              return res.status(204);
            });
            app.get('/:shirtID', function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
                var db, textures, tshirt;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return !fs.existsSync('server/public/' + req.params.shirtID);

                      case 3:
                        if (!_context4.sent) {
                          _context4.next = 6;
                          break;
                        }

                        _context4.next = 6;
                        return fs.mkdirSync('server/public/' + req.params.shirtID);

                      case 6:
                        _context4.next = 8;
                        return dbPromise;

                      case 8:
                        db = _context4.sent;
                        _context4.next = 11;
                        return db.all('SELECT * FROM tshirtTextures WHERE tshirtId = ?', req.params.shirtID);

                      case 11:
                        textures = _context4.sent;
                        _context4.next = 14;
                        return db.get('SELECT * FROM tshirts WHERE id = ?', req.params.shirtID);

                      case 14:
                        tshirt = _context4.sent;
                        _context4.next = 17;
                        return new Jimp(1024, 1024, tshirt.color, function () {
                          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, image) {
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    _context3.next = 2;
                                    return image.writeAsync('server/public/' + req.params.shirtID + '/color.png').then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                      var base, images, jimps;
                                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                          switch (_context2.prev = _context2.next) {
                                            case 0:
                                              base = ['server/public/' + req.params.shirtID + '/color.png'];
                                              images = [].concat(base, _toConsumableArray(textures.filter(function (x) {
                                                return x.source !== '';
                                              }).map(function (y) {
                                                return 'server/public/textures/' + y.source;
                                              })));

                                              console.log(images);

                                              jimps = images.map(function (x, i) {
                                                if (x.includes('color.png')) {
                                                  return Jimp.read(x);
                                                } else {
                                                  return Jimp.read(x).then(function (img) {
                                                    var deg = Number(textures[i - 1].rotate.split('deg')[0]);
                                                    return img.resize(textures[i - 1].renderSize, textures[i - 1].renderSize).rotate(deg * -1, false).color([{ apply: 'xor', params: [textures[i - 1].tintColor] }]);
                                                  });
                                                }
                                              });
                                              _context2.next = 6;
                                              return Promise.all(jimps).then(function () {
                                                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
                                                  return regeneratorRuntime.wrap(function _callee$(_context) {
                                                    while (1) {
                                                      switch (_context.prev = _context.next) {
                                                        case 0:
                                                          _context.next = 2;
                                                          return data.map(function (x, i) {
                                                            if (i !== 0) {
                                                              var sideTshirt = textures[i - 1].face;
                                                              var posX = sideTshirt === 'front' ? textures[i - 1].posX : textures[i - 1].posX + 512;
                                                              var posY = sideTshirt === 'front' ? textures[i - 1].posY : textures[i - 1].posY;
                                                              data[0].composite(x, posX + 140, posY + 135);
                                                            }
                                                          });

                                                        case 2:

                                                          data[0].write('server/public/' + req.params.shirtID + '/base.png', function () {
                                                            return console.log('wrote the image');
                                                          });

                                                        case 3:
                                                        case 'end':
                                                          return _context.stop();
                                                      }
                                                    }
                                                  }, _callee, undefined);
                                                }));

                                                return function (_x6) {
                                                  return _ref5.apply(this, arguments);
                                                };
                                              }());

                                            case 6:
                                              res.render('index', {
                                                id: req.params.shirtID,
                                                camera: -1.7,
                                                bgB: 0.55,
                                                bgR: 0.33,
                                                bgG: 0.2
                                              });
                                              request.get('http://localhost:3333/frontAndBack/' + req.params.shirtID).on('response', function (response) {
                                                return console.log(response.statusCode);
                                              });

                                            case 8:
                                            case 'end':
                                              return _context2.stop();
                                          }
                                        }
                                      }, _callee2, undefined);
                                    })));

                                  case 2:
                                  case 'end':
                                    return _context3.stop();
                                }
                              }
                            }, _callee3, undefined);
                          }));

                          return function (_x4, _x5) {
                            return _ref3.apply(this, arguments);
                          };
                        }());

                      case 17:
                        _context4.next = 22;
                        break;

                      case 19:
                        _context4.prev = 19;
                        _context4.t0 = _context4['catch'](0);

                        next(_context4.t0);

                      case 22:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined, [[0, 19]]);
              }));

              return function (_x, _x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            app.get('/front/:shirtID', function (req, res) {
              res.render('index', {
                id: req.params.shirtID, camera: -1, bgB: 1, bgR: 1, bgG: 1
              });
            });
            app.get('/back/:shirtID', function (req, res) {
              res.render('index', {
                id: req.params.shirtID, camera: 1, bgB: 1, bgR: 1, bgG: 1
              });
            });
            app.get('/delete/:shirtID', function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return fs.existsSync('server/public/' + req.params.shirtID);

                      case 3:
                        if (!_context5.sent) {
                          _context5.next = 6;
                          break;
                        }

                        _context5.next = 6;
                        return rimraf('server/public/' + req.params.shirtID, function () {
                          return console.log('Tshirt deletion done!');
                        });

                      case 6:
                        _context5.next = 11;
                        break;

                      case 8:
                        _context5.prev = 8;
                        _context5.t0 = _context5['catch'](0);

                        next(_context5.t0);

                      case 11:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined, [[0, 8]]);
              }));

              return function (_x7, _x8, _x9) {
                return _ref6.apply(this, arguments);
              };
            }());
            app.listen(PORT, function () {
              return console.log('\uD83D\uDE80 Server ready at http://localhost:' + PORT + server.graphqlPath);
            });

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

var init = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _mocks2.default)({ populating: true, force: true });

          case 2:
            startServer();

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function init() {
    return _ref7.apply(this, arguments);
  };
}();

init();