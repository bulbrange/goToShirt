'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _connectors = require('./connectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var resolvers = exports.resolvers = {
  Date: _graphqlDate2.default,
  Query: {
    user: function user(_, args) {
      return _connectors.User.findOne({ where: args });
    },
    userByEmail: function userByEmail(_, args) {
      return _connectors.User.findOne({ where: args });
    },
    users: function users() {
      return _connectors.User.findAll();
    },
    group: function group(_, args) {
      return _connectors.Group.find({ where: args });
    },
    groups: function groups() {
      return _connectors.Group.findAll();
    },
    messages: function messages(_, args) {
      return _connectors.MessageGroup.find({ where: args });
    },
    textures: function textures(_, _ref) {
      var tshirtId = _ref.tshirtId;
      return _connectors.TshirtTextures.findAll({ where: { tshirtId: tshirtId } });
    },
    tshirt: function tshirt(_, args) {
      return _connectors.Tshirt.findOne({ where: args });
    },
    tshirts: function tshirts(_, args) {
      return _connectors.Tshirt.findAll({ where: args, order: [['updatedAt', 'DESC']] });
    }
  },
  Mutation: {
    addNewUser: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _connectors.User.create(args));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function addNewUser(_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(),
    updateUserEmail: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4) {
        var id = _ref4.id,
            email = _ref4.email;
        var userToUpdate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _connectors.User.find({ where: { id: id } });

              case 3:
                userToUpdate = _context2.sent;

                // userToUpdate.destoy();
                userToUpdate.update({ email: email });
                return _context2.abrupt('return', userToUpdate);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](0);

                console.log(_context2.t0);
                throw new Error('To the parrot');

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[0, 8]]);
      }));

      return function updateUserEmail(_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }(),
    delUser: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref6) {
        var id = _ref6.id;
        var userToDel;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _connectors.User.find({ where: { id: id } });

              case 2:
                userToDel = _context3.sent;

                userToDel.destroy();
                return _context3.abrupt('return', userToDel);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function delUser(_x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }(),
    addNewShirt: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', _connectors.Tshirt.create(args));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function addNewShirt(_x7, _x8) {
        return _ref7.apply(this, arguments);
      };
    }(),
    addTexture: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref9) {
        var _ref9$texture = _ref9.texture,
            source = _ref9$texture.source,
            posX = _ref9$texture.posX,
            posY = _ref9$texture.posY,
            renderSize = _ref9$texture.renderSize,
            backgroundColor = _ref9$texture.backgroundColor,
            tintColor = _ref9$texture.tintColor,
            face = _ref9$texture.face,
            tshirtId = _ref9$texture.tshirtId,
            rotate = _ref9$texture.rotate,
            text = _ref9$texture.text;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', _connectors.TshirtTextures.create({
                  source: source,
                  posX: posX,
                  posY: posY,
                  renderSize: renderSize,
                  backgroundColor: backgroundColor,
                  tintColor: tintColor,
                  face: face,
                  tshirtId: tshirtId,
                  rotate: rotate,
                  text: text
                }));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function addTexture(_x9, _x10) {
        return _ref8.apply(this, arguments);
      };
    }(),
    cleanShirtTextures: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref11) {
        var tshirtId = _ref11.tshirtId;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _connectors.TshirtTextures.destroy({ where: { tshirtId: tshirtId } });

              case 2:
                return _context6.abrupt('return', _connectors.Tshirt.findOne({ where: tshirtId }));

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function cleanShirtTextures(_x11, _x12) {
        return _ref10.apply(this, arguments);
      };
    }(),
    updateShirtName: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref13) {
        var tshirtId = _ref13.tshirtId,
            name = _ref13.name;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt('return', _connectors.Tshirt.findOne({ where: { id: tshirtId } }).then(function (tshirt) {
                  return tshirt.update({ name: name });
                }));

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      return function updateShirtName(_x13, _x14) {
        return _ref12.apply(this, arguments);
      };
    }(),
    updateShirtColor: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref15) {
        var tshirtId = _ref15.tshirtId,
            color = _ref15.color;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt('return', _connectors.Tshirt.findOne({ where: { id: tshirtId } }).then(function (tshirt) {
                  return tshirt.update({ color: color });
                }));

              case 1:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      }));

      return function updateShirtColor(_x15, _x16) {
        return _ref14.apply(this, arguments);
      };
    }(),
    removeShirt: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, _ref17) {
        var tshirtId = _ref17.tshirtId;
        var tshirt;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _connectors.Tshirt.findOne({ where: { id: tshirtId } });

              case 2:
                tshirt = _context9.sent;
                _context9.next = 5;
                return _connectors.TshirtTextures.destroy({ where: { tshirtId: tshirtId } });

              case 5:
                _context9.next = 7;
                return _connectors.Tshirt.destroy({ where: { id: tshirtId } });

              case 7:
                return _context9.abrupt('return', tshirt);

              case 8:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      }));

      return function removeShirt(_x17, _x18) {
        return _ref16.apply(this, arguments);
      };
    }()
  },
  Tshirt: {
    texture: function texture(tshirt) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt('return', _connectors.TshirtTextures.findAll({ where: { tshirtId: tshirt.id } }));

              case 1:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, _this);
      }))();
    }
  },
  Group: {
    users: function users(group) {
      return group.getUsers();
    },
    messages: function messages(group) {
      return _connectors.MessageGroup.findAll({
        where: { groupId: group.id },
        order: [['createdAt', 'DESC']]
      });
    }
  },

  User: {
    groups: function groups(user) {
      return user.getGroups();
    }
  }
};
exports.default = resolvers;