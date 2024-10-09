/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/components/DeleteDiscussionModal.tsx":
/*!********************************************************!*\
  !*** ./src/admin/components/DeleteDiscussionModal.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteDiscussionModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




var DeleteDiscussionModal = /*#__PURE__*/function (_Modal) {
  function DeleteDiscussionModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.discussion = void 0;
    _this.discussionDeleted = void 0;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(DeleteDiscussionModal, _Modal);
  var _proto = DeleteDiscussionModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.discussion = vnode.attrs.discussion;
    this.discussionDeleted = this.attrs.discussionDeleted;
  };
  _proto.className = function className() {
    return 'DeleteDiscussionModal Modal--small';
  };
  _proto.title = function title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_discussion.title');
  };
  _proto.content = function content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_discussion.confirmation'), " ", m("strong", null, this.discussion.title())), m("div", {
      className: "Form-group"
    }, flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      className: 'Button Button--primary Button--block',
      type: 'submit',
      loading: this.loading
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_discussion.delete_button'))));
  };
  _proto.onsubmit = function onsubmit(e) {
    var _this2 = this;
    e.preventDefault();
    this.loading = true;
    flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().request({
      url: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('apiUrl') + "/discussions/" + this.discussion.id(),
      method: 'DELETE'
    }).then(function () {
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().modal.close();
      _this2.discussionDeleted(true);
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_discussion.success'));
      //window.location.reload();
    })["catch"](function () {
      _this2.loading = false;
      m.redraw();
    });
  };
  return DeleteDiscussionModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/admin/components/MassDeleteDiscussionModal.tsx":
/*!************************************************************!*\
  !*** ./src/admin/components/MassDeleteDiscussionModal.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MassDeleteDiscussionModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




var MassDeleteDiscussionModal = /*#__PURE__*/function (_Modal) {
  function MassDeleteDiscussionModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.selectedDiscussions = void 0;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MassDeleteDiscussionModal, _Modal);
  var _proto = MassDeleteDiscussionModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.selectedDiscussions = this.attrs.selectedDiscussions;
  };
  _proto.className = function className() {
    return 'MassDeleteDiscussionModal Modal--small';
  };
  _proto.title = function title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.title');
  };
  _proto.content = function content() {
    var _this2 = this;
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_start'), " ", m("strong", null, this.selectedDiscussions.size), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_end')), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: "Button Button--primary",
      onclick: function onclick() {
        return _this2.onsubmit();
      }
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.submit_button'))));
  };
  _proto.onsubmit = function onsubmit() {
    var _this3 = this;
    this.loading = true;
    var promises = Array.from(this.selectedDiscussions).map(function (discussionId) {
      return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().store.find('discussions', discussionId).then(function (discussion) {
        return discussion["delete"]();
      });
    });
    Promise.all(promises).then(function () {
      _this3.hide();
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.success'));
      window.location.reload();
    })["catch"](function () {
      _this3.loading = false;
      m.redraw();
    });
  };
  return MassDeleteDiscussionModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/admin/components/MassRestoreDiscussionModal.tsx":
/*!*************************************************************!*\
  !*** ./src/admin/components/MassRestoreDiscussionModal.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MassRestoreDiscussionModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




var MassRestoreDiscussionModal = /*#__PURE__*/function (_Modal) {
  function MassRestoreDiscussionModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.selectedDiscussions = void 0;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MassRestoreDiscussionModal, _Modal);
  var _proto = MassRestoreDiscussionModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.selectedDiscussions = this.attrs.selectedDiscussions;
  };
  _proto.className = function className() {
    return 'MassRestoreDiscussionModal Modal--small';
  };
  _proto.title = function title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.title');
  };
  _proto.content = function content() {
    var _this2 = this;
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.text_start'), " ", m("strong", null, this.selectedDiscussions.size), ' ', flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.text_end')), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: "Button Button--primary",
      onclick: function onclick() {
        return _this2.onsubmit();
      }
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.submit_button'))));
  };
  _proto.onsubmit = function onsubmit() {
    var _this3 = this;
    this.loading = true;
    var promises = Array.from(this.selectedDiscussions).map(function (discussionId) {
      return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().store.find('discussions', discussionId).then(function (discussion) {
        return discussion.save({
          isHidden: false
        });
      });
    });
    Promise.all(promises).then(function () {
      _this3.hide();
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.success'));
      window.location.reload();
    })["catch"](function () {
      _this3.loading = false;
      m.redraw();
    });
  };
  return MassRestoreDiscussionModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/admin/components/RecycleBinPage.tsx":
/*!*************************************************!*\
  !*** ./src/admin/components/RecycleBinPage.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RecycleBinPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_readOnlyError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/readOnlyError */ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/utils/classList */ "flarum/common/utils/classList");
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flarum/common/utils/throttleDebounce */ "flarum/common/utils/throttleDebounce");
/* harmony import */ var flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! flarum/common/helpers/humanTime */ "flarum/common/helpers/humanTime");
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _RestoreDiscussionModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./RestoreDiscussionModal */ "./src/admin/components/RestoreDiscussionModal.tsx");
/* harmony import */ var _DeleteDiscussionModal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./DeleteDiscussionModal */ "./src/admin/components/DeleteDiscussionModal.tsx");
/* harmony import */ var _MassRestoreDiscussionModal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./MassRestoreDiscussionModal */ "./src/admin/components/MassRestoreDiscussionModal.tsx");
/* harmony import */ var _MassDeleteDiscussionModal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./MassDeleteDiscussionModal */ "./src/admin/components/MassDeleteDiscussionModal.tsx");



















/**
 * Admin page which displays a paginated list of all hidden discussions on the forum.
 */
var RecycleBinPage = /*#__PURE__*/function (_ExtensionPage) {
  function RecycleBinPage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _ExtensionPage.call.apply(_ExtensionPage, [this].concat(args)) || this;
    _this.query = '';
    _this.throttledSearch = (0,flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_12__.debounce)(250, function () {
      return _this.loadPage(0);
    });
    _this.discussionRestored = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_14___default()(false);
    _this.discussionDeleted = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_14___default()(false);
    _this.hiddenDiscussionsCount = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_14___default()((flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().data).modelStatistics.discussions.hidden);
    /**
     * Number of discussions to load per page.
     */
    _this.numPerPage = 25;
    /**
     * Current page number. Zero-indexed.
     */
    _this.pageNumber = 0;
    /**
     * Page number being loaded. Zero-indexed.
     */
    _this.loadingPageNumber = 0;
    /**
     * This page's array of discussions.
     *
     * `undefined` when page loads as no data has been fetched.
     */
    _this.pageData = undefined;
    /**
     * Are there more hidden discussions available?
     */
    _this.moreData = false;
    _this.isLoadingPage = false;
    /**
     * Tracking which discussions have been selected for mass actions.
     */
    _this.selectedDiscussions = new Set();
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(RecycleBinPage, _ExtensionPage);
  var _proto = RecycleBinPage.prototype;
  /**
   * Total number of forum hidden discussions.
   *
   * Fetched from the active `AdminApplication` (`app`), with
   * data provided by extension of `AdminPayload.php` on extend.php.
   */
  // readonly hiddenDiscussionsCount: number = app.data.modelStatistics.discussions.hidden;
  /**
   * Get total number of hidden discussion pages.
   */
  _proto.getTotalPageCount = function getTotalPageCount() {
    var count = this.hiddenDiscussionsCount();
    if (count === -1 || isNaN(count)) return 0;
    return Math.ceil(count / this.numPerPage);
  };
  _proto.toggleDiscussionSelection = function toggleDiscussionSelection(e, discussionId) {
    var checkbox = e.target;
    if (checkbox.checked) {
      this.selectedDiscussions.add(discussionId);
    } else {
      this.selectedDiscussions["delete"](discussionId);
    }
    m.redraw();
  };
  _proto.oninit = function oninit(vnode) {
    var _this2 = this;
    _ExtensionPage.prototype.oninit.call(this, vnode);

    // Get page query value from URL
    var page = parseInt(m.route.param('page'));
    if (isNaN(page) || page < 1) {
      this.setPageNumberInUrl(1);
      this.pageNumber = 0;
    } else {
      this.pageNumber = page - 1;
    }
    this.loadingPageNumber = this.pageNumber;
    this.discussionRestored.map(function (restored) {
      if (restored) {
        _this2.loadPage(_this2.pageNumber);
        _this2.hiddenDiscussionsCount(_this2.hiddenDiscussionsCount() - 1);
        _this2.discussionRestored(false); // Reset the Stream
      }
    });
    this.discussionDeleted.map(function (deleted) {
      if (deleted) {
        _this2.loadPage(_this2.pageNumber);
        _this2.hiddenDiscussionsCount(_this2.hiddenDiscussionsCount() - 1);
        _this2.discussionDeleted(false); // Reset the Stream
      }
    });
  }

  /**
   * Component to render.
   */;
  _proto.content = function content(vnode) {
    var _this3 = this;
    if (typeof this.pageData === 'undefined') {
      this.loadPage(this.pageNumber);
      return m("div", {
        className: "extensionPage-settings"
      }, m("div", {
        className: "container"
      }, m("section", {
        className: "RecycleBinPage-grid RecycleBinPage-grid--loading"
      }, m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5___default()), {
        containerClassName: "LoadingIndicator--block",
        size: "large"
      }))));
    }
    var columns = this.columns().toArray();
    return m("div", {
      className: "ExtensionPage-settings"
    }, m("div", {
      className: "container"
    }, m("div", {
      className: "RecycleBinPage-header"
    }, this.headerItems().toArray()), m("section", {
      className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10___default()(['RecycleBinPage-grid', this.isLoadingPage ? 'RecycleBinPage-grid--loadingPage' : 'RecycleBinPage-grid--loaded']),
      style: {
        '--columns': columns.length
      },
      role: "table",
      "aria-rowcount": this.pageData.length + 1,
      "aria-colcount": columns.length,
      "aria-live": "polite",
      "aria-busy": this.isLoadingPage ? 'true' : 'false'
    }, columns.map(function (column, colIndex) {
      return m("div", {
        className: "RecycleBinPage-grid-header",
        role: "columnheader",
        "aria-colindex": colIndex + 1,
        "aria-rowindex": 1
      }, column.name);
    }), this.pageData.map(function (discussion, rowIndex) {
      return columns.map(function (col, colIndex) {
        var columnContent = col.content && col.content(discussion);
        return m("div", {
          className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10___default()(['RecycleBinPage-grid-rowItem', rowIndex % 2 > 0 && 'RecycleBinPage-grid-rowItem--shaded']),
          "data-discussion-id": discussion.id(),
          "data-column-name": col.itemName,
          "aria-colindex": colIndex + 1,
          "aria-rowindex": rowIndex + 2,
          role: "cell"
        }, columnContent || flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.grid.invalid_column_content'));
      });
    }), this.isLoadingPage && m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5___default()), {
      size: "large"
    })), m("div", {
      className: "RecycleBinPage-massActions"
    }, this.massActions().toArray()), m("nav", {
      className: "RecycleBinPage-gridPagination"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
      disabled: this.pageNumber === 0,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.pagination.first_page_button'),
      onclick: this.goToPage.bind(this, 1),
      icon: "fas fa-step-backward",
      className: "Button Button--icon RecycleBinPage-firstPageBtn"
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
      disabled: this.pageNumber === 0,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.pagination.back_button'),
      onclick: this.previousPage.bind(this),
      icon: "fas fa-chevron-left",
      className: "Button Button--icon RecycleBinPage-backBtn"
    }), m("span", {
      className: "RecycleBinPage-pageNumber"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.pagination.page_counter', {
      current: m("input", {
        type: "text",
        inputmode: "numeric",
        pattern: "[0-9]*",
        value: this.loadingPageNumber + 1,
        "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_11___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.pagination.go_to_page_textbox_a11y_label')),
        autocomplete: "off",
        className: "FormControl RecycleBinPage-pageNumberInput",
        onchange: function onchange(e) {
          var target = e.target;
          var pageNumber = parseInt(target.value);
          if (isNaN(pageNumber)) {
            target.value = (_this3.pageNumber + 1).toString();
            return;
          }
          if (pageNumber < 1) {
            pageNumber = 1;
          } else if (pageNumber > _this3.getTotalPageCount()) {
            pageNumber = _this3.getTotalPageCount();
          }
          target.value = pageNumber.toString();
          _this3.goToPage(pageNumber);
        }
      }),
      currentNum: this.pageNumber + 1,
      total: this.getTotalPageCount()
    })), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
      disabled: !this.moreData,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.pagination.next_button'),
      onclick: this.nextPage.bind(this),
      icon: "fas fa-chevron-right",
      className: "Button Button--icon RecycleBinPage-nextBtn"
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
      disabled: !this.moreData,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.pagination.last_page_button'),
      onclick: this.goToPage.bind(this, this.getTotalPageCount()),
      icon: "fas fa-step-forward",
      className: "Button Button--icon RecycleBinPage-lastPageBtn"
    }))));
  };
  _proto.headerItems = function headerItems() {
    var _this4 = this;
    var items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9___default())();
    items.add('search', m("div", {
      className: "Search-input"
    }, m("input", {
      className: "FormControl SearchBar",
      type: "search",
      placeholder: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.search_placeholder'),
      oninput: function oninput(e) {
        var _e$target;
        _this4.isLoadingPage = true;
        _this4.query = e == null || (_e$target = e.target) == null ? void 0 : _e$target.value;
        _this4.throttledSearch();
      }
    })), 100);
    items.add('totalHiddenDiscussions', m("p", {
      "class": "RecycleBinPage-totalDiscussions"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.total_hidden_discussions'), ": ", this.hiddenDiscussionsCount()), 90);
    return items;
  }

  /**
   * Build an item list of columns to show for each hidden discussion.
   *
   * Each column in the list should be an object with keys `name` and `content`.
   *
   * `name` is a string that will be used as the column name.
   * `content` is a function with the Discussion model passed as the first and only argument.
   *
   * See `RecycleBinPage.tsx` for examples.
   */;
  _proto.columns = function columns() {
    var _this5 = this;
    var columns = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9___default())();
    columns.add('selection', {
      name: '',
      content: function content(discussion) {
        return m("input", {
          type: "checkbox",
          className: "RecycleBinPage-Checkbox",
          onclick: function onclick(e) {
            var id = discussion.id();
            if (id !== undefined) {
              _this5.toggleDiscussionSelection(e, id);
            }
          }
        });
      }
    }, 100);
    columns.add('id', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.discussion_id'),
      content: function content(discussion) {
        var _discussion$id;
        return (_discussion$id = discussion.id()) != null ? _discussion$id : null;
      }
    }, 99);
    columns.add('discussionTitle', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.discussion_title'),
      content: function content(discussion) {
        var discussionUrl = flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().forum.attribute('baseUrl') + "/d/" + discussion.slug();
        return m("a", {
          target: "_blank",
          href: discussionUrl,
          title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.discussion_link_tooltip')
        }, discussion.title());
      }
    }, 90);
    columns.add('author', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.discussion_author'),
      content: function content(discussion) {
        var user = discussion.user();
        return user && typeof user.displayName === 'function' ? user.displayName() : flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.unknown_user');
      }
    }, 85);
    columns.add('createdAt', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.created_at'),
      content: function content(discussion) {
        return m("span", {
          className: "DiscussionList-creationDate",
          title: discussion.createdAt()
        }, discussion.createdAt() ? flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_13___default()(discussion.createdAt()) : flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.unknown_date'));
      }
    }, 80);
    columns.add('hiddenAt', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.hidden_at'),
      content: function content(discussion) {
        return m("span", {
          className: "DiscussionList-hiddenDate",
          title: discussion.hiddenAt()
        }, discussion.hiddenAt() ? flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_13___default()(discussion.hiddenAt()) : flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.unknown_date'));
      }
    }, 80);
    columns.add('actions', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.actions'),
      content: function content(discussion) {
        return m('[', null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
          className: "Button DiscussionList-editModalBtn",
          title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.restore_tooltip', {
            discussion: discussion.title()
          }),
          onclick: function onclick() {
            return flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().modal.show(_RestoreDiscussionModal__WEBPACK_IMPORTED_MODULE_15__["default"], {
              discussion: discussion,
              discussionRestored: _this5.discussionRestored
            });
          }
        }, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7___default()('fas fa-trash-restore')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
          className: "Button DiscussionList-editModalBtn",
          title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.delete_tooltip', {
            discussion: discussion.title()
          }),
          onclick: function onclick() {
            return flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().modal.show(_DeleteDiscussionModal__WEBPACK_IMPORTED_MODULE_16__["default"], {
              discussion: discussion,
              discussionDeleted: _this5.discussionDeleted
            });
          }
        }, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7___default()('fas fa-times')));
      }
    }, -90);
    return columns;
  }

  /**
   * Build an item list of mass actions buttons to show under the hidden discussions list.
   */;
  _proto.massActions = function massActions() {
    var _this6 = this;
    var massActions = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9___default())();
    var hasSelection = this.selectedDiscussions.size > 0;
    massActions.add('actionsLabel', m("span", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.bulk_actions')), 100);
    massActions.add('massRestore', m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
      className: "Button",
      onclick: function onclick() {
        flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().modal.show(_MassRestoreDiscussionModal__WEBPACK_IMPORTED_MODULE_17__["default"], {
          selectedDiscussions: _this6.selectedDiscussions
        });
      },
      disabled: !hasSelection
    }, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7___default()('fas fa-trash-restore'), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.bulk_restore_label')), 90);
    massActions.add('massDelete', m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
      className: "Button",
      onclick: function onclick() {
        flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().modal.show(_MassDeleteDiscussionModal__WEBPACK_IMPORTED_MODULE_18__["default"], {
          selectedDiscussions: _this6.selectedDiscussions
        });
      },
      disabled: !hasSelection
    }, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7___default()('fas fa-times'), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('walsgit-recycle-bin.admin.bulk_delete_label')), 80);
    return massActions;
  }
  /**
   * Asynchronously fetch the next set of hidden discussions to be rendered.
   *
   * Returns an array of Discussions, plus the raw API payload.
   *
   * Uses the `this.numPerPage` as the response limit, and automatically calculates the offset required from `pageNumber`.
   *
   * @param pageNumber The **zero-based** page number to load and display
   */;
  _proto.loadPage =
  /*#__PURE__*/
  function () {
    var _loadPage = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(pageNumber) {
      var _this7 = this;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (pageNumber < 0) pageNumber = 0;
            this.loadingPageNumber = pageNumber;
            this.setPageNumberInUrl(pageNumber + 1);
            this.selectedDiscussions.clear();
            flarum_admin_app__WEBPACK_IMPORTED_MODULE_4___default().store.find('discussions', {
              filter: {
                q: ("is:hidden " + this.query).trim()
              },
              page: {
                limit: this.numPerPage,
                offset: pageNumber * this.numPerPage
              }
            }).then(function (apiData) {
              var _apiData$payload;
              // Next link won't be present if there's no more data
              _this7.moreData = !!((_apiData$payload = apiData.payload) != null && (_apiData$payload = _apiData$payload.links) != null && _apiData$payload.next);
              var data = apiData.filter(function (discussion) {
                return discussion.isHidden();
              });

              // @ts-ignore
              delete data.payload;
              var lastPage = _this7.getTotalPageCount();
              if (pageNumber > lastPage) {
                _this7.loadPage(lastPage - 1);
              } else {
                _this7.pageData = data;
                _this7.pageNumber = pageNumber;
                _this7.loadingPageNumber = pageNumber;
                _this7.isLoadingPage = false;
              }
              m.redraw();
            })["catch"](function (err) {
              console.error(err);
              _this7.pageData = [];
            });
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function loadPage(_x) {
      return _loadPage.apply(this, arguments);
    }
    return loadPage;
  }();
  _proto.nextPage = function nextPage() {
    this.isLoadingPage = true;
    this.loadPage(this.pageNumber + 1);
  };
  _proto.previousPage = function previousPage() {
    this.isLoadingPage = true;
    this.loadPage(this.pageNumber - 1);
  }

  /**
   * @param page The **1-based** page number
   */;
  _proto.goToPage = function goToPage(page) {
    this.isLoadingPage = true;
    this.loadPage(page - 1);
  };
  _proto.setPageNumberInUrl = function setPageNumberInUrl(pageNumber) {
    var _search$;
    var search = window.location.hash.split('?', 2);
    var params = new URLSearchParams((_search$ = search == null ? void 0 : search[1]) != null ? _search$ : '');
    params.set('page', "" + pageNumber);
    window.location.hash = (search == null ? void 0 : search[0]) + '?' + params.toString();
  };
  return RecycleBinPage;
}((flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_8___default()));


/***/ }),

/***/ "./src/admin/components/RestoreDiscussionModal.tsx":
/*!*********************************************************!*\
  !*** ./src/admin/components/RestoreDiscussionModal.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RestoreDiscussionModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




var RestoreDiscussionModal = /*#__PURE__*/function (_Modal) {
  function RestoreDiscussionModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.discussion = void 0;
    _this.discussionRestored = void 0;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RestoreDiscussionModal, _Modal);
  var _proto = RestoreDiscussionModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.discussion = this.attrs.discussion;
    this.discussionRestored = this.attrs.discussionRestored;
  };
  _proto.className = function className() {
    return 'RestoreDiscussionModal Modal--small';
  };
  _proto.title = function title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.restore_discussion.title');
  };
  _proto.content = function content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.restore_discussion.confirmation'), " ", m("strong", null, this.discussion.title())), m("div", {
      className: "Form Form--centered"
    }, m("div", {
      className: "Form-group"
    }, flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      type: 'submit',
      className: 'Button Button--primary Button--block',
      loading: this.loading
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.restore_discussion.restore_button')))));
  };
  _proto.onsubmit = function onsubmit(e) {
    var _this2 = this;
    e.preventDefault();
    this.loading = true;
    this.discussion.save({
      isHidden: false
    }).then(function () {
      _this2.hide();
      _this2.discussionRestored(true);
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.restore_discussion.success'));
      //window.location.reload();
    })["catch"](function () {
      _this2.loading = false;
      m.redraw();
    });
  };
  return RestoreDiscussionModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/admin/index.tsx":
/*!*****************************!*\
  !*** ./src/admin/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_RecycleBinPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/RecycleBinPage */ "./src/admin/components/RecycleBinPage.tsx");


flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('walsgit/recycle-bin', function () {
  return flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('walsgit-recycle-bin').registerPage(_components_RecycleBinPage__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('walsgit/recycle-bin', function () {
  console.log('[walsgit/recycle-bin] Hello, forum and admin!');
});

/***/ }),

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ }),

/***/ "flarum/admin/components/ExtensionPage":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['admin/components/ExtensionPage']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/components/ExtensionPage'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/helpers/humanTime":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/humanTime']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/humanTime'];

/***/ }),

/***/ "flarum/common/helpers/icon":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/icon']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/icon'];

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/ItemList']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/ItemList'];

/***/ }),

/***/ "flarum/common/utils/Stream":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/utils/Stream']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/Stream'];

/***/ }),

/***/ "flarum/common/utils/classList":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/utils/classList']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/classList'];

/***/ }),

/***/ "flarum/common/utils/extractText":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/utils/extractText']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/extractText'];

/***/ }),

/***/ "flarum/common/utils/throttleDebounce":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['common/utils/throttleDebounce']" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/throttleDebounce'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/readOnlyError.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _readOnlyError)
/* harmony export */ });
function _readOnlyError(r) {
  throw new TypeError('"' + r + '" is read-only');
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.tsx");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map