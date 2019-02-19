'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _connectors = require('./connectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// create fake starter data

var USERS = 20;
var IP = '172.16.100.207';
_faker2.default.seed(123); // get consistent data every time we reload app

// you don't need to stare at this code too hard
// just trust that it fakes a bunch of groups, users, and messages

var mockDB = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$populating = _ref2.populating,
        populating = _ref2$populating === undefined ? false : _ref2$populating,
        _ref2$force = _ref2.force,
        force = _ref2$force === undefined ? false : _ref2$force;

    var mockUsers, arrTextures, imenGroup;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            force ? console.log('\x1b[33m\x1b[1mcreating database....\x1b[37m') : console.log('\x1b[32m\x1b[1mDATABASE ALREADY CREATED!!\x1b[37m');

            _context9.next = 3;
            return _connectors.db.sync({ force: force });

          case 3:
            if (populating) {
              _context9.next = 5;
              break;
            }

            return _context9.abrupt('return', Promise.resolve(true));

          case 5:
            console.log('\x1b[33m\x1b[1mpopulating users....\x1b[37m');
            _ramda2.default.times(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var user;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _connectors.User.create({
                        email: _faker2.default.internet.email(),
                        username: _faker2.default.internet.userName(),
                        password: _faker2.default.internet.password(),
                        phone: _faker2.default.phone.phoneNumber()
                      });

                    case 2:
                      user = _context.sent;
                      return _context.abrupt('return', user);

                    case 4:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            })), USERS);

            mockUsers = [{
              email: 'casas222@gmail.com',
              username: 'jcasas',
              password: '12345',
              phone: '616551747'
            }, {
              email: 'jaimemg@outlook.com',
              username: 'jmolli',
              password: '12345',
              phone: '670372228'
            }, {
              email: 'hola@danilab.es',
              username: 'dballes',
              password: '12345',
              phone: '637853760'
            }, {
              email: 'tonymartoscode@gmail.com',
              username: 'tmartos',
              password: '12345',
              phone: '662016324'
            }, {
              email: 'andresherrerof@gmail.com',
              username: 'aherrero',
              password: '12345',
              phone: '651167986'
            }];
            arrTextures = ['bansky1.png', 'chewaka.png', 'it.png', 'keep-calm.png', 'rebel.png', 'soldiers1.png', 'surtich.jpeg'];
            _context9.next = 11;
            return _connectors.Group.create({
              name: 'I-MEN',
              image: 'https://facebook.github.io/react-native/img/header_logo.png'
            });

          case 11:
            imenGroup = _context9.sent;


            Promise.all(mockUsers.map(function (user) {
              return _connectors.User.create(user);
            })).then(function (users) {
              return users.map(function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(user) {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _connectors.UserGroups.create({
                            userId: user.id,
                            groupId: imenGroup.id
                          });
                          _ramda2.default.times(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                            var messages;
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    _context2.next = 2;
                                    return _connectors.MessageGroup.create({
                                      text: _faker2.default.lorem.words(3),
                                      groupId: imenGroup.id,
                                      userId: user.id
                                    });

                                  case 2:
                                    messages = _context2.sent;
                                    return _context2.abrupt('return', messages);

                                  case 4:
                                  case 'end':
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, undefined);
                          })), 10);

                          _ramda2.default.times(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                            var tshirt;
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    _context4.next = 2;
                                    return _connectors.Tshirt.create({
                                      userId: user.id,
                                      name: _faker2.default.hacker.noun(),
                                      color: _faker2.default.internet.color()
                                    });

                                  case 2:
                                    tshirt = _context4.sent;

                                    _ramda2.default.times(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                                      var textures;
                                      return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                          switch (_context3.prev = _context3.next) {
                                            case 0:
                                              _context3.next = 2;
                                              return _connectors.TshirtTextures.create({
                                                source: _faker2.default.random.arrayElement(arrTextures),
                                                posX: _faker2.default.random.number(70, 170),
                                                posY: _faker2.default.random.number(70, 270),
                                                renderSize: Math.floor(Math.random() * 100) + 80,
                                                face: _faker2.default.random.arrayElement(['front', 'back']),
                                                tshirtId: tshirt.id,
                                                backgroundColor: _faker2.default.random.arrayElement(['#00ff00', '#ff0000', '#0000ff', '#000000', '#121212']),
                                                tintColor: _faker2.default.random.arrayElement([null, '#fafafa', null, '#1204f0']),
                                                text: '',
                                                rotate: _faker2.default.random.arrayElement(['15deg', '0deg', '30deg', '0deg'])
                                              });

                                            case 2:
                                              textures = _context3.sent;
                                              return _context3.abrupt('return', textures);

                                            case 4:
                                            case 'end':
                                              return _context3.stop();
                                          }
                                        }
                                      }, _callee3, undefined);
                                    })), Math.floor(Math.random() * 10 + 1));

                                    _connectors.GroupTshirt.create({
                                      groupId: imenGroup.id,
                                      tshirtId: tshirt.id
                                    });

                                  case 5:
                                  case 'end':
                                    return _context4.stop();
                                }
                              }
                            }, _callee4, undefined);
                          })), 2);

                        case 3:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, undefined);
                }));

                return function (_x2) {
                  return _ref4.apply(this, arguments);
                };
              }());
            });

            _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _ramda2.default.times(function () {
                        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(i) {
                          return regeneratorRuntime.wrap(function _callee7$(_context7) {
                            while (1) {
                              switch (_context7.prev = _context7.next) {
                                case 0:
                                  _context7.next = 2;
                                  return _connectors.Tshirt.create({
                                    userId: 1,
                                    name: _faker2.default.hacker.noun(),
                                    color: _faker2.default.internet.color()
                                  });

                                case 2:
                                  _ramda2.default.times(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                                    var textures;
                                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                      while (1) {
                                        switch (_context6.prev = _context6.next) {
                                          case 0:
                                            _context6.next = 2;
                                            return _connectors.TshirtTextures.create({
                                              source: _faker2.default.random.arrayElement(arrTextures),
                                              posX: _faker2.default.random.number(70, 170),
                                              posY: _faker2.default.random.number(70, 270),
                                              renderSize: Math.floor(Math.random() * 100) + 80,
                                              face: _faker2.default.random.arrayElement(['front', 'back']),
                                              tshirtId: i + 1,
                                              backgroundColor: _faker2.default.random.arrayElement(['#00ff00', '#ff0000', '#0000ff', '#000000', '#121212']),
                                              tintColor: _faker2.default.random.arrayElement([null, '#fafafa', null, '#1204f0']),
                                              text: '',
                                              rotate: _faker2.default.random.arrayElement(['15deg', '0deg', '30deg', '0deg'])
                                            });

                                          case 2:
                                            textures = _context6.sent;
                                            return _context6.abrupt('return', textures);

                                          case 4:
                                          case 'end':
                                            return _context6.stop();
                                        }
                                      }
                                    }, _callee6, undefined);
                                  })), Math.floor(Math.random() * 10 + 1));

                                case 3:
                                case 'end':
                                  return _context7.stop();
                              }
                            }
                          }, _callee7, undefined);
                        }));

                        return function (_x3) {
                          return _ref9.apply(this, arguments);
                        };
                      }(), 5);

                    case 1:
                    case 'end':
                      return _context8.stop();
                  }
                }
              }, _callee8, undefined);
            }))();

            console.log('\x1b[32m\x1b[1m¡DATABASE CREATED!\x1b[37m');

          case 15:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function mockDB() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = mockDB;