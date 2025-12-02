/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
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
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




class DeleteDiscussionModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "discussion", void 0);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "discussionDeleted", void 0);
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.discussion = vnode.attrs.discussion;
    this.discussionDeleted = this.attrs.discussionDeleted;
  }
  className() {
    return 'DeleteDiscussionModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_discussion.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_discussion.confirmation'), " ", m("strong", null, this.discussion.title())), m("div", {
      className: "Form-group"
    }, flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      className: 'Button Button--primary Button--block',
      type: 'submit',
      loading: this.loading
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_discussion.delete_button'))));
  }
  onsubmit(e) {
    e.preventDefault();
    this.loading = true;
    flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().request({
      url: "".concat(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('apiUrl'), "/discussions/").concat(this.discussion.id()),
      method: 'DELETE'
    }).then(() => {
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().modal.close();
      if (this.discussionDeleted) {
        this.discussionDeleted(true);
      }
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_discussion.success'));
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/DeleteDiscussionModal', DeleteDiscussionModal);

/***/ }),

/***/ "./src/admin/components/DeletePostModal.tsx":
/*!**************************************************!*\
  !*** ./src/admin/components/DeletePostModal.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeletePostModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




class DeletePostModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "post", void 0);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "postDeleted", void 0);
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.post = vnode.attrs.post;
    this.postDeleted = this.attrs.postDeleted;
  }
  className() {
    return 'DeletePostModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_post.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_post.confirmation'), " ", m("strong", null, this.post.discussion().title()), " :"), m("pre", null, m("code", null, this.post.content())), m("div", {
      className: "Form-group"
    }, flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      className: 'Button Button--primary Button--block',
      type: 'submit',
      loading: this.loading
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_post.delete_button'))));
  }
  onsubmit(e) {
    e.preventDefault();
    this.loading = true;
    flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().request({
      url: "".concat(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('apiUrl'), "/posts/").concat(this.post.id()),
      method: 'DELETE'
    }).then(() => {
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().modal.close();
      if (this.postDeleted) {
        this.postDeleted(true);
      }
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.delete_post.success'));
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/DeletePostModal', DeletePostModal);

/***/ }),

/***/ "./src/admin/components/DiscussionsBinPage.tsx":
/*!*****************************************************!*\
  !*** ./src/admin/components/DiscussionsBinPage.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RecycleBinPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/classList */ "flarum/common/utils/classList");
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/utils/throttleDebounce */ "flarum/common/utils/throttleDebounce");
/* harmony import */ var flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/helpers/humanTime */ "flarum/common/helpers/humanTime");
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _RestoreDiscussionModal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RestoreDiscussionModal */ "./src/admin/components/RestoreDiscussionModal.tsx");
/* harmony import */ var _DeleteDiscussionModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./DeleteDiscussionModal */ "./src/admin/components/DeleteDiscussionModal.tsx");
/* harmony import */ var _MassRestoreDiscussionModal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./MassRestoreDiscussionModal */ "./src/admin/components/MassRestoreDiscussionModal.tsx");
/* harmony import */ var _MassDeleteDiscussionModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./MassDeleteDiscussionModal */ "./src/admin/components/MassDeleteDiscussionModal.tsx");
















/**
 * Admin page which displays a paginated list of all hidden discussions on the forum.
 */
class RecycleBinPage extends (flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_1___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "query", '');
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "throttledSearch", (0,flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_9__.debounce)(250, () => this.loadPage(0)));
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "discussionRestored", flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11___default()(false));
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "discussionDeleted", flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11___default()(false));
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "hiddenDiscussionsCount", flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11___default()(0));
    /**
     * Number of discussions to load per page.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "numPerPage", 25);
    /**
     * Current page number. Zero-indexed.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "pageNumber", 0);
    /**
     * Page number being loaded. Zero-indexed.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loadingPageNumber", 0);
    /**
     * This page's array of discussions.
     *
     * `undefined` when page loads as no data has been fetched.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "pageData", undefined);
    /**
     * Are there more hidden discussions available?
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "moreData", false);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isLoadingPage", false);
    /**
     * Tracking which discussions have been selected for mass actions.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedDiscussions", new Set());
  }
  /**
   * Get total number of hidden discussion pages.
   */
  getTotalPageCount() {
    const count = this.hiddenDiscussionsCount();
    if (count === -1 || isNaN(count)) return 0;
    return Math.ceil(count / this.numPerPage);
  }
  toggleDiscussionSelection(e, discussionId) {
    const checkbox = e.target;
    if (checkbox.checked) {
      this.selectedDiscussions.add(discussionId);
    } else {
      this.selectedDiscussions.delete(discussionId);
    }
    m.redraw();
  }
  oninit(vnode) {
    super.oninit(vnode);
    m.request({
      method: 'GET',
      url: '/api/recycle-bin/discussion-statistics'
    }).then(result => {
      const typedResult = result;
      this.hiddenDiscussionsCount(typedResult.hidden_discussions_count); // updates the stream
    }).catch(error => {
      console.error(error);
    });

    // Get page query value from URL
    const page = parseInt(m.route.param('page'));
    if (isNaN(page) || page < 1) {
      this.setPageNumberInUrl(1);
      this.pageNumber = 0;
    } else {
      this.pageNumber = page - 1;
    }
    this.loadingPageNumber = this.pageNumber;
    this.discussionRestored.map(restored => {
      if (restored) {
        this.loadPage(this.pageNumber);
        this.hiddenDiscussionsCount(this.hiddenDiscussionsCount() - 1);
        this.discussionRestored(false); // Reset the Stream
      }
    });
    this.discussionDeleted.map(deleted => {
      if (deleted) {
        this.loadPage(this.pageNumber);
        this.hiddenDiscussionsCount(this.hiddenDiscussionsCount() - 1);
        this.discussionDeleted(false); // Reset the Stream
      }
    });
  }
  /**
   * Component to render.
   */
  view(vnode) {
    if (typeof this.pageData === 'undefined') {
      this.loadPage(this.pageNumber);
      return m("div", {
        className: "extensionPage-settings"
      }, m("div", {
        className: "container"
      }, m("section", {
        className: "RecycleBinPage-grid RecycleBinPage-grid--loading"
      }, m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default()), {
        containerClassName: 'LoadingIndicator--block',
        size: 'large'
      }))));
    }
    const columns = this.columns().toArray();
    return m("div", {
      className: "ExtensionPage-settings"
    }, m("h2", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.discussions_bin')), m("div", {
      className: "RecycleBinPage-header"
    }, this.headerItems().toArray()), m("section", {
      className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7___default()(['RecycleBinPage-grid', this.isLoadingPage ? 'RecycleBinPage-grid--loadingPage' : 'RecycleBinPage-grid--loaded']),
      style: {
        '--columns': columns.length
      },
      role: "table",
      "aria-rowcount": this.pageData.length + 1,
      "aria-colcount": columns.length,
      "aria-live": "polite",
      "aria-busy": this.isLoadingPage ? 'true' : 'false'
    }, columns.map((column, colIndex) => m("div", {
      className: "RecycleBinPage-grid-header",
      role: "columnheader",
      "aria-colindex": colIndex + 1,
      "aria-rowindex": 1
    }, column.name)), this.pageData.map((discussion, rowIndex) => columns.map((col, colIndex) => {
      const columnContent = col.content && col.content(discussion);
      return m("div", {
        className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7___default()(['RecycleBinPage-grid-rowItem', rowIndex % 2 > 0 && 'RecycleBinPage-grid-rowItem--shaded']),
        "data-discussion-id": discussion.id(),
        "data-column-name": col.itemName,
        "aria-colindex": colIndex + 1,
        "aria-rowindex": rowIndex + 2,
        role: "cell"
      }, columnContent || flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.grid.invalid_column_content'));
    })), this.isLoadingPage && m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default()), {
      size: 'large'
    })), m("div", {
      className: "RecycleBinPage-massActions"
    }, this.massActions().toArray()), m("nav", {
      className: "RecycleBinPage-gridPagination"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      disabled: this.pageNumber === 0,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.first_page_button'),
      onclick: this.goToPage.bind(this, 1),
      icon: 'fas fa-step-backward',
      className: 'Button Button--icon RecycleBinPage-firstPageBtn'
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      disabled: this.pageNumber === 0,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.back_button'),
      onclick: this.previousPage.bind(this),
      icon: 'fas fa-chevron-left',
      className: 'Button Button--icon RecycleBinPage-backBtn'
    }), m("span", {
      className: "RecycleBinPage-pageNumber"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.page_counter', {
      current: m("input", {
        type: "text",
        inputMode: "numeric",
        pattern: "[0-9]*",
        value: this.loadingPageNumber + 1,
        "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_8___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.go_to_page_textbox_a11y_label')),
        autoComplete: "off",
        className: "FormControl RecycleBinPage-pageNumberInput",
        onchange: e => {
          const target = e.target;
          let pageNumber = parseInt(target.value);
          if (isNaN(pageNumber)) {
            target.value = (this.pageNumber + 1).toString();
            return;
          }
          if (pageNumber < 1) {
            pageNumber = 1;
          } else if (pageNumber > this.getTotalPageCount()) {
            pageNumber = this.getTotalPageCount();
          }
          target.value = pageNumber.toString();
          this.goToPage(pageNumber);
        }
      }),
      currentNum: this.pageNumber + 1,
      total: this.getTotalPageCount()
    })), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      disabled: !this.moreData,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.next_button'),
      onclick: this.nextPage.bind(this),
      icon: 'fas fa-chevron-right',
      className: 'Button Button--icon RecycleBinPage-nextBtn'
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      disabled: !this.moreData,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.last_page_button'),
      onclick: this.goToPage.bind(this, this.getTotalPageCount()),
      icon: 'fas fa-step-forward',
      className: 'Button Button--icon RecycleBinPage-lastPageBtn'
    })));
  }
  headerItems() {
    const items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default())();
    items.add('search', m("div", {
      className: "Search-input"
    }, m("input", {
      className: "FormControl SearchBar",
      type: "search",
      placeholder: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.search_placeholder', {
        contentType: 'discussion'
      }),
      oninput: e => {
        var _e$target;
        this.isLoadingPage = true;
        this.query = e == null || (_e$target = e.target) == null ? void 0 : _e$target.value;
        this.throttledSearch();
      }
    })), 100);
    items.add('searchHelpText', m("div", {
      class: "helpText"
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: "fas fa-info-circle"
    }), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.search_help_text')), 95);
    items.add('totalHiddenDiscussions', m("p", {
      class: "RecycleBinPage-totalDiscussions"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.total_hidden_discussions'), ": ", this.hiddenDiscussionsCount()), 90);
    return items;
  }

  /**
   * Build an item list of columns to show for each hidden discussion.
   *
   * Each column in the list should be an object with keys `name` and `content`.
   *
   * `name` is a string that will be used as the column name.
   * `content` is a function with the Discussion model passed as the first and only argument.
   */
  columns() {
    const columns = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default())();
    columns.add('selection', {
      name: '',
      content: discussion => {
        return m("input", {
          type: "checkbox",
          className: "RecycleBinPage-Checkbox",
          onclick: e => {
            const id = discussion.id();
            if (id !== undefined) {
              this.toggleDiscussionSelection(e, id);
            }
          }
        });
      }
    }, 100);
    columns.add('id', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.discussion_id'),
      content: discussion => {
        var _discussion$id;
        return (_discussion$id = discussion.id()) != null ? _discussion$id : null;
      }
    }, 99);
    columns.add('discussionTitle', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.discussion_title'),
      content: discussion => {
        const discussionUrl = "".concat(flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('baseUrl'), "/d/").concat(discussion.slug());
        return m("a", {
          target: "_blank",
          href: discussionUrl,
          title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.discussion_link_tooltip')
        }, discussion.title());
      }
    }, 90);
    columns.add('author', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.author'),
      content: discussion => {
        const user = discussion.user();
        return user && typeof user.displayName === 'function' ? user.displayName() : flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.unknown_user');
      }
    }, 85);
    columns.add('createdAt', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.created_at'),
      content: discussion => m("span", {
        className: "DiscussionList-creationDate",
        title: discussion.createdAt()
      }, discussion.createdAt() ? flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10___default()(discussion.createdAt()) : flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.unknown_date'))
    }, 80);
    columns.add('hiddenAt', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.hidden_at'),
      content: discussion => m("span", {
        className: "DiscussionList-hiddenDate",
        title: discussion.hiddenAt()
      }, discussion.hiddenAt() ? flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10___default()(discussion.hiddenAt()) : flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.unknown_date'))
    }, 80);
    columns.add('actions', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.actions'),
      content: discussion => m('[', null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
        className: 'Button DiscussionList-editModalBtn',
        title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_tooltip', {
          discussion: discussion.title()
        }),
        onclick: () => flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_RestoreDiscussionModal__WEBPACK_IMPORTED_MODULE_12__["default"], {
          discussion: discussion,
          discussionRestored: this.discussionRestored
        })
      }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
        name: "fas fa-trash-restore"
      })), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
        className: 'Button DiscussionList-editModalBtn',
        title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.delete_tooltip', {
          discussion: discussion.title()
        }),
        onclick: () => flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_DeleteDiscussionModal__WEBPACK_IMPORTED_MODULE_13__["default"], {
          discussion: discussion,
          discussionDeleted: this.discussionDeleted
        })
      }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
        name: "fas fa-times"
      })))
    }, -90);
    return columns;
  }

  /**
   * Build an item list of mass actions buttons to show under the hidden discussions list.
   */
  massActions() {
    const massActions = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default())();
    const hasSelection = this.selectedDiscussions.size > 0;
    massActions.add('actionsLabel', m("span", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.bulk_actions')), 100);
    massActions.add('massRestore', m("button", {
      className: "Button",
      onclick: () => {
        flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_MassRestoreDiscussionModal__WEBPACK_IMPORTED_MODULE_14__["default"], {
          selectedDiscussions: this.selectedDiscussions
        });
      },
      disabled: !hasSelection
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: "fas fa-trash-restore"
    }), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.bulk_restore_label')), 90);
    massActions.add('massDelete', m("button", {
      className: "Button",
      onclick: () => {
        flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_MassDeleteDiscussionModal__WEBPACK_IMPORTED_MODULE_15__["default"], {
          selectedDiscussions: this.selectedDiscussions
        });
      },
      disabled: !hasSelection
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: "fas fa-times"
    }), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.bulk_delete_label')), 80);
    massActions.add('massHelpText', m("div", {
      className: "helpText"
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: "fas fa-info-circle"
    }), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.mass_help_text')), 70);
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
   */
  async loadPage(pageNumber) {
    if (pageNumber < 0) pageNumber = 0;
    this.loadingPageNumber = pageNumber;
    this.setPageNumberInUrl(pageNumber + 1);
    this.selectedDiscussions.clear();
    flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().store.find('discussions', {
      filter: {
        q: "is:hidden ".concat(this.query).trim()
      },
      page: {
        limit: this.numPerPage,
        offset: pageNumber * this.numPerPage
      }
    }).then(apiData => {
      var _apiData$payload;
      // Next link won't be present if there's no more data
      this.moreData = !!((_apiData$payload = apiData.payload) != null && (_apiData$payload = _apiData$payload.links) != null && _apiData$payload.next);
      let data = apiData.filter(discussion => discussion.isHidden());

      // @ts-ignore
      delete data.payload;
      const lastPage = this.getTotalPageCount();
      if (pageNumber > lastPage) {
        this.loadPage(lastPage - 1);
      } else {
        this.pageData = data;
        this.pageNumber = pageNumber;
        this.loadingPageNumber = pageNumber;
        this.isLoadingPage = false;
      }
      m.redraw();
    }).catch(err => {
      console.error(err);
      this.pageData = [];
    });
  }
  nextPage() {
    this.isLoadingPage = true;
    this.loadPage(this.pageNumber + 1);
  }
  previousPage() {
    this.isLoadingPage = true;
    this.loadPage(this.pageNumber - 1);
  }

  /**
   * @param page The **1-based** page number
   */
  goToPage(page) {
    this.isLoadingPage = true;
    this.loadPage(page - 1);
  }
  setPageNumberInUrl(pageNumber) {
    var _search$;
    const search = window.location.hash.split('?', 2);
    const params = new URLSearchParams((_search$ = search == null ? void 0 : search[1]) != null ? _search$ : '');
    params.set('page', "".concat(pageNumber));
    window.location.hash = (search == null ? void 0 : search[0]) + '?' + params.toString();
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/DiscussionsBinPage', RecycleBinPage);

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
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




class MassDeleteDiscussionModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedDiscussions", void 0);
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.selectedDiscussions = this.attrs.selectedDiscussions;
  }
  className() {
    return 'MassDeleteDiscussionModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_start'), " ", m("strong", null, this.selectedDiscussions.size), ' ', flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_end')), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: 'Button Button--primary Button--block',
      onclick: () => this.onsubmit()
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.submit_button'))));
  }
  onsubmit() {
    this.loading = true;
    const promises = Array.from(this.selectedDiscussions).map(discussionId => {
      return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().store.find('discussions', discussionId).then(discussion => {
        return discussion.delete();
      });
    });
    Promise.all(promises).then(() => {
      this.hide();
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.success'));
      window.location.reload();
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/MassDeleteDiscussionModal', MassDeleteDiscussionModal);

/***/ }),

/***/ "./src/admin/components/MassDeletePostModal.tsx":
/*!******************************************************!*\
  !*** ./src/admin/components/MassDeletePostModal.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MassDeletePostModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




class MassDeletePostModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedPosts", void 0);
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.selectedPosts = this.attrs.selectedPosts;
  }
  className() {
    return 'MassDeleteDiscussionModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_start'), " ", m("strong", null, this.selectedPosts.size), ' ', flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_end')), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: 'Button Button--primary Button--block',
      onclick: () => this.onsubmit()
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_post_modal.submit_button'))));
  }
  onsubmit() {
    this.loading = true;
    const promises = Array.from(this.selectedPosts).map(postId => {
      return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().store.find('posts', postId).then(post => {
        return post.delete();
      });
    });
    Promise.all(promises).then(() => {
      this.hide();
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.success'));
      window.location.reload();
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/MassDeletePostModal', MassDeletePostModal);

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
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




class MassRestoreDiscussionModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedDiscussions", void 0);
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.selectedDiscussions = this.attrs.selectedDiscussions;
  }
  className() {
    return 'MassRestoreDiscussionModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.text_start'), " ", m("strong", null, this.selectedDiscussions.size), ' ', flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.text_end')), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: 'Button Button--primary Button--block',
      onclick: () => this.onsubmit()
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.submit_button'))));
  }
  onsubmit() {
    this.loading = true;
    const promises = Array.from(this.selectedDiscussions).map(discussionId => {
      return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().store.find('discussions', discussionId).then(discussion => {
        return discussion.save({
          isHidden: false
        });
      });
    });
    Promise.all(promises).then(() => {
      this.hide();
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.success'));
      window.location.reload();
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/MassRestoreDiscussionModal', MassRestoreDiscussionModal);

/***/ }),

/***/ "./src/admin/components/MassRestorePostModal.tsx":
/*!*******************************************************!*\
  !*** ./src/admin/components/MassRestorePostModal.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MassRestorePostModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




class MassRestorePostModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedPosts", void 0);
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.selectedPosts = this.attrs.selectedPosts;
  }
  className() {
    return 'MassRestorePostModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.text_start'), " ", m("strong", null, this.selectedPosts.size), ' ', flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.text_end')), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: 'Button Button--primary Button--block',
      onclick: () => this.onsubmit()
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.submit_button'))));
  }
  onsubmit() {
    this.loading = true;
    const promises = Array.from(this.selectedPosts).map(postId => {
      return flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().store.find('posts', postId).then(post => {
        return post.save({
          isHidden: false
        });
      });
    });
    Promise.all(promises).then(() => {
      this.hide();
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.success'));
      window.location.reload();
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/MassRestorePostModal', MassRestorePostModal);

/***/ }),

/***/ "./src/admin/components/PostsBinPage.tsx":
/*!***********************************************!*\
  !*** ./src/admin/components/PostsBinPage.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostsBinPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/classList */ "flarum/common/utils/classList");
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/utils/throttleDebounce */ "flarum/common/utils/throttleDebounce");
/* harmony import */ var flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/helpers/humanTime */ "flarum/common/helpers/humanTime");
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _RestorePostModal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RestorePostModal */ "./src/admin/components/RestorePostModal.tsx");
/* harmony import */ var _DeletePostModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./DeletePostModal */ "./src/admin/components/DeletePostModal.tsx");
/* harmony import */ var _MassRestorePostModal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./MassRestorePostModal */ "./src/admin/components/MassRestorePostModal.tsx");
/* harmony import */ var _MassDeletePostModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./MassDeletePostModal */ "./src/admin/components/MassDeletePostModal.tsx");
/* harmony import */ var flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! flarum/common/utils/string */ "flarum/common/utils/string");
/* harmony import */ var flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_16__);

















/**
 * Admin page which displays a paginated list of all hidden posts on the forum.
 */
class PostsBinPage extends (flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_1___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "query", '');
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "throttledSearch", (0,flarum_common_utils_throttleDebounce__WEBPACK_IMPORTED_MODULE_9__.debounce)(250, () => this.loadPage(0)));
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "postRestored", flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11___default()(false));
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "postDeleted", flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11___default()(false));
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "hiddenPostsCount", flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_11___default()(0));
    /**
     * Number of discussions to load per page.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "numPerPage", 25);
    /**
     * Current page number. Zero-indexed.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "pageNumber", 0);
    /**
     * Page number being loaded. Zero-indexed.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loadingPageNumber", 0);
    /**
     * This page's array of discussions.
     *
     * `undefined` when page loads as no data has been fetched.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "pageData", undefined);
    /**
     * Are there more hidden discussions available?
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "moreData", false);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isLoadingPage", false);
    /**
     * Tracking which discussions have been selected for mass actions.
     */
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedPosts", new Set());
  }
  /**
   * Get total number of hidden discussion pages.
   */
  getTotalPageCount() {
    const count = this.hiddenPostsCount();
    if (count === -1 || isNaN(count)) return 0;
    return Math.ceil(count / this.numPerPage);
  }
  togglePostSelection(e, postId) {
    const checkbox = e.target;
    if (checkbox.checked) {
      this.selectedPosts.add(postId);
    } else {
      this.selectedPosts.delete(postId);
    }
    m.redraw();
  }
  oninit(vnode) {
    super.oninit(vnode);
    m.request({
      method: 'GET',
      url: '/api/recycle-bin/post-statistics'
    }).then(result => {
      const typedResult = result;
      this.hiddenPostsCount(typedResult.hidden_posts_count);
    }).catch(error => {
      console.error(error);
    });

    // Get page query value from URL
    const page = parseInt(m.route.param('page'));
    if (isNaN(page) || page < 1) {
      this.setPageNumberInUrl(1);
      this.pageNumber = 0;
    } else {
      this.pageNumber = page - 1;
    }
    this.loadingPageNumber = this.pageNumber;
    this.postRestored.map(restored => {
      if (restored) {
        this.loadPage(this.pageNumber);
        this.hiddenPostsCount(this.hiddenPostsCount() - 1);
        this.postRestored(false); // Reset the Stream
      }
    });
    this.postDeleted.map(deleted => {
      if (deleted) {
        this.loadPage(this.pageNumber);
        this.hiddenPostsCount(this.hiddenPostsCount() - 1);
        this.postDeleted(false); // Reset the Stream
      }
    });
  }
  /**
   * Component to render.
   */
  view(vnode) {
    if (typeof this.pageData === 'undefined') {
      this.loadPage(this.pageNumber);
      return m("div", {
        className: "extensionPage-settings"
      }, m("div", {
        className: "container"
      }, m("section", {
        className: "RecycleBinPage-grid RecycleBinPage-grid--loading"
      }, m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default()), {
        containerClassName: 'LoadingIndicator--block',
        size: 'large'
      }))));
    }
    const columns = this.columns().toArray();
    return m("div", {
      className: "ExtensionPage-settings"
    }, m("h2", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.posts_bin')), m("div", {
      className: "RecycleBinPage-header"
    }, this.headerItems().toArray()), m("section", {
      className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7___default()(['RecycleBinPage-grid', this.isLoadingPage ? 'RecycleBinPage-grid--loadingPage' : 'RecycleBinPage-grid--loaded']),
      style: {
        '--columns': columns.length
      },
      role: "table",
      "aria-rowcount": this.pageData.length + 1,
      "aria-colcount": columns.length,
      "aria-live": "polite",
      "aria-busy": this.isLoadingPage ? 'true' : 'false'
    }, columns.map((column, colIndex) => m("div", {
      className: "RecycleBinPage-grid-header",
      role: "columnheader",
      "aria-colindex": colIndex + 1,
      "aria-rowindex": 1
    }, column.name)), this.pageData.map((post, rowIndex) => columns.map((col, colIndex) => {
      const columnContent = col.content && col.content(post);
      return m("div", {
        className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_7___default()(['RecycleBinPage-grid-rowItem', rowIndex % 2 > 0 && 'RecycleBinPage-grid-rowItem--shaded']),
        "data-post-id": post.id(),
        "data-column-name": col.itemName,
        "aria-colindex": colIndex + 1,
        "aria-rowindex": rowIndex + 2,
        role: "cell"
      }, columnContent || flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.grid.invalid_column_content'));
    })), this.isLoadingPage && m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default()), {
      size: 'large'
    })), m("div", {
      className: "RecycleBinPage-massActions"
    }, this.massActions().toArray()), m("nav", {
      className: "RecycleBinPage-gridPagination"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      disabled: this.pageNumber === 0,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.first_page_button'),
      onclick: this.goToPage.bind(this, 1),
      icon: 'fas fa-step-backward',
      className: 'Button Button--icon RecycleBinPage-firstPageBtn'
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      disabled: this.pageNumber === 0,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.back_button'),
      onclick: this.previousPage.bind(this),
      icon: 'fas fa-chevron-left',
      className: 'Button Button--icon RecycleBinPage-backBtn'
    }), m("span", {
      className: "RecycleBinPage-pageNumber"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.page_counter', {
      current: m("input", {
        type: "text",
        inputMode: "numeric",
        pattern: "[0-9]*",
        value: this.loadingPageNumber + 1,
        "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_8___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.go_to_page_textbox_a11y_label')),
        autoComplete: "off",
        className: "FormControl RecycleBinPage-pageNumberInput",
        onchange: e => {
          const target = e.target;
          let pageNumber = parseInt(target.value);
          if (isNaN(pageNumber)) {
            target.value = (this.pageNumber + 1).toString();
            return;
          }
          if (pageNumber < 1) {
            pageNumber = 1;
          } else if (pageNumber > this.getTotalPageCount()) {
            pageNumber = this.getTotalPageCount();
          }
          target.value = pageNumber.toString();
          this.goToPage(pageNumber);
        }
      }),
      currentNum: this.pageNumber + 1,
      total: this.getTotalPageCount()
    })), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      disabled: !this.moreData,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.next_button'),
      onclick: this.nextPage.bind(this),
      icon: 'fas fa-chevron-right',
      className: 'Button Button--icon RecycleBinPage-nextBtn'
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      disabled: !this.moreData,
      title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.pagination.last_page_button'),
      onclick: this.goToPage.bind(this, this.getTotalPageCount()),
      icon: 'fas fa-step-forward',
      className: 'Button Button--icon RecycleBinPage-lastPageBtn'
    })));
  }
  headerItems() {
    const items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default())();
    items.add('search', m("div", {
      className: "Search-input"
    }, m("input", {
      className: "FormControl SearchBar",
      type: "search",
      placeholder: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.search_post_placeholder'),
      oninput: e => {
        var _e$target;
        this.isLoadingPage = true;
        this.query = e == null || (_e$target = e.target) == null ? void 0 : _e$target.value;
        this.throttledSearch();
      }
    })), 100);
    items.add('searchHelpText', m("div", {
      class: "helpText"
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: "fas fa-info-circle"
    }), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.search_post_help_text')), 95);
    items.add('totalHiddenDiscussions', m("p", {
      class: "RecycleBinPage-totalDiscussions"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.total_hidden_posts'), ": ", this.hiddenPostsCount()), 90);
    return items;
  }

  /**
   * Build an item list of columns to show for each hidden discussion.
   *
   * Each column in the list should be an object with keys `name` and `content`.
   *
   * `name` is a string that will be used as the column name.
   * `content` is a function with the Discussion model passed as the first and only argument.
   */
  columns() {
    const columns = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default())();
    columns.add('selection', {
      name: '',
      content: post => {
        return m("input", {
          type: "checkbox",
          className: "RecycleBinPage-Checkbox",
          onclick: e => {
            const id = post.id();
            if (id !== undefined) {
              this.togglePostSelection(e, id);
            }
          }
        });
      }
    }, 100);
    columns.add('id', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.post.id'),
      content: post => {
        var _post$id;
        return (_post$id = post.id()) != null ? _post$id : null;
      }
    }, 99);
    columns.add('post', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.post.title'),
      content: post => {
        const postUrl = "".concat(flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('baseUrl'), "/d/").concat(post.discussion().slug(), "/").concat(post.number());
        return m("span", null, (0,flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_16__.truncate)(post.content() || '', 100), ' ', m("a", {
          href: postUrl,
          target: "_blank"
        }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.post.open_post')));
      }
    }, 90);
    columns.add('author', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.author'),
      content: post => {
        const user = post.user();
        return user && typeof user.displayName === 'function' ? user.displayName() : flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.unknown_user');
      }
    }, 85);
    columns.add('createdAt', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.created_at'),
      content: post => m("span", {
        className: "DiscussionList-creationDate",
        title: post.createdAt()
      }, post.createdAt() ? flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10___default()(post.createdAt()) : flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.unknown_date'))
    }, 80);
    columns.add('hiddenAt', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.hidden_at'),
      content: post => m("span", {
        className: "DiscussionList-hiddenDate",
        title: post.hiddenAt()
      }, post.hiddenAt() ? flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_10___default()(post.hiddenAt()) : flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.unknown_date'))
    }, 80);
    columns.add('actions', {
      name: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.actions'),
      content: post => m('[', null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
        className: 'Button DiscussionList-editModalBtn',
        title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_post_tooltip', {
          discussion: post.id()
        }),
        onclick: () => flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_RestorePostModal__WEBPACK_IMPORTED_MODULE_12__["default"], {
          post: post,
          postRestored: this.postRestored
        })
      }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
        name: "fas fa-trash-restore"
      })), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
        className: 'Button DiscussionList-editModalBtn',
        title: flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.delete_post_tooltip', {
          discussion: post.id()
        }),
        onclick: () => flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_DeletePostModal__WEBPACK_IMPORTED_MODULE_13__["default"], {
          post: post,
          postDeleted: this.postDeleted
        })
      }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
        name: "fas fa-times"
      })))
    }, -90);
    return columns;
  }

  /**
   * Build an item list of mass actions buttons to show under the hidden discussions list.
   */
  massActions() {
    const massActions = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_6___default())();
    const hasSelection = this.selectedPosts.size > 0;
    massActions.add('actionsLabel', m("span", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.bulk_post_actions')), 100);
    massActions.add('massRestore', m("button", {
      className: "Button",
      onclick: () => {
        flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_MassRestorePostModal__WEBPACK_IMPORTED_MODULE_14__["default"], {
          selectedPosts: this.selectedPosts
        });
      },
      disabled: !hasSelection
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: "fas fa-trash-restore"
    }), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.bulk_post_restore_label')), 90);
    massActions.add('massDelete', m("button", {
      className: "Button",
      onclick: () => {
        flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_MassDeletePostModal__WEBPACK_IMPORTED_MODULE_15__["default"], {
          selectedPosts: this.selectedPosts
        });
      },
      disabled: !hasSelection
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: "fas fa-times"
    }), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.bulk_post_delete_label')), 80);
    massActions.add('massHelpText', m("div", {
      className: "helpText"
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: "fas fa-info-circle"
    }), " ", flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.mass_help_text')), 70);
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
   */
  async loadPage(pageNumber) {
    if (pageNumber < 0) pageNumber = 0;
    this.loadingPageNumber = pageNumber;
    this.setPageNumberInUrl(pageNumber + 1);
    this.selectedPosts.clear();
    const query = this.query.trim();
    flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().store.find('posts', {
      filter: {
        hidden: true,
        content: query
      },
      page: {
        limit: this.numPerPage,
        offset: pageNumber * this.numPerPage
      }
    }).then(apiData => {
      var _apiData$payload;
      // Next link won't be present if there's no more data
      this.moreData = !!((_apiData$payload = apiData.payload) != null && (_apiData$payload = _apiData$payload.links) != null && _apiData$payload.next);
      let data = apiData.filter(post => post.isHidden());

      // @ts-ignore
      delete data.payload;
      const lastPage = this.getTotalPageCount();
      if (pageNumber > lastPage) {
        this.loadPage(lastPage - 1);
      } else {
        this.pageData = data;
        this.pageNumber = pageNumber;
        this.loadingPageNumber = pageNumber;
        this.isLoadingPage = false;
      }
      m.redraw();
    }).catch(err => {
      console.error(err);
      this.pageData = [];
    });
  }
  nextPage() {
    this.isLoadingPage = true;
    this.loadPage(this.pageNumber + 1);
  }
  previousPage() {
    this.isLoadingPage = true;
    this.loadPage(this.pageNumber - 1);
  }

  /**
   * @param page The **1-based** page number
   */
  goToPage(page) {
    this.isLoadingPage = true;
    this.loadPage(page - 1);
  }
  setPageNumberInUrl(pageNumber) {
    var _search$;
    const search = window.location.hash.split('?', 2);
    const params = new URLSearchParams((_search$ = search == null ? void 0 : search[1]) != null ? _search$ : '');
    params.set('page', "".concat(pageNumber));
    window.location.hash = (search == null ? void 0 : search[0]) + '?' + params.toString();
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/PostsBinPage', PostsBinPage);

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
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Form */ "flarum/common/components/Form");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);





class RestoreDiscussionModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_3___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "discussion", void 0);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "discussionRestored", void 0);
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.discussion = this.attrs.discussion;
    this.discussionRestored = this.attrs.discussionRestored;
  }
  className() {
    return 'RestoreDiscussionModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_discussion.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_discussion.confirmation'), " ", m("strong", null, this.discussion.title())), m((flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "Form--centered"
    }, m("div", {
      className: "Form-group"
    }, flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default().component({
      type: 'submit',
      className: 'Button Button--primary Button--block',
      loading: this.loading
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_discussion.restore_button')))));
  }
  onsubmit(e) {
    e.preventDefault();
    this.loading = true;
    this.discussion.save({
      isHidden: false
    }).then(() => {
      this.hide();
      if (this.discussionRestored) {
        this.discussionRestored(true);
      }
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_discussion.success'));
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/RestoreDiscussionModal', RestoreDiscussionModal);

/***/ }),

/***/ "./src/admin/components/RestorePostModal.tsx":
/*!***************************************************!*\
  !*** ./src/admin/components/RestorePostModal.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RestorePostModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Form */ "flarum/common/components/Form");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);





class RestorePostModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_3___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "post", void 0);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "postRestored", void 0);
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.post = this.attrs.post;
    this.postRestored = this.attrs.postRestored;
  }
  className() {
    return 'RestorePostModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_post.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_post.confirmation'), " ", m("strong", null, this.post.discussion().title()), " :"), m("pre", null, m("code", null, this.post.content())), m((flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "Form--centered"
    }, m("div", {
      className: "Form-group"
    }, flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default().component({
      type: 'submit',
      className: 'Button Button--primary Button--block',
      loading: this.loading
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_post.restore_button')))));
  }
  onsubmit(e) {
    e.preventDefault();
    this.loading = true;
    this.post.save({
      isHidden: false
    }).then(() => {
      this.hide();
      if (this.postRestored) {
        this.postRestored(true);
      }
      m.redraw();
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().alerts.show({
        type: 'success'
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('walsgit-recycle-bin.admin.restore_post.success'));
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/RestorePostModal', RestorePostModal);

/***/ }),

/***/ "./src/admin/components/SettingsPage.tsx":
/*!***********************************************!*\
  !*** ./src/admin/components/SettingsPage.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DiscussionsBinPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DiscussionsBinPage */ "./src/admin/components/DiscussionsBinPage.tsx");
/* harmony import */ var _PostsBinPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PostsBinPage */ "./src/admin/components/PostsBinPage.tsx");





class SettingsPage extends (flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default()) {
  content() {
    const bin = m.route.param().bin || 'discussions-bin';
    return m("div", {
      className: "ExtensionPage-settings RecycleBin"
    }, m("div", {
      className: "RecycleBin-menu"
    }, m("div", {
      className: "container"
    }, this.menuButtons(bin))), m("div", {
      className: "container RecycleBin-container"
    }, this.pageContent(bin)));
  }

  // Return button menus
  menuButtons(bin) {
    return [flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: "Button ".concat(bin === 'discussions-bin' ? 'item-selected' : ''),
      onclick: () => m.route.set(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().route('extension', {
        id: 'walsgit-recycle-bin',
        bin: 'discussions-bin',
        page: 1
      })),
      icon: 'fas fa-comment'
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('walsgit-recycle-bin.admin.discussions_bin')), flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: "Button ".concat(bin === 'posts-bin' ? 'item-selected' : ''),
      onclick: () => m.route.set(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().route('extension', {
        id: 'walsgit-recycle-bin',
        bin: 'posts-bin',
        page: 1
      })),
      icon: 'far fa-comment-dots'
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('walsgit-recycle-bin.admin.posts_bin'))];
  }
  pageContent(bin) {
    if (bin === 'posts-bin') {
      return m(_PostsBinPage__WEBPACK_IMPORTED_MODULE_4__["default"], null);
    }
    // Default Discussions bin
    return m(_DiscussionsBinPage__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  }
}
flarum.reg.add('walsgit-recycle-bin', 'admin/components/SettingsPage', SettingsPage);

/***/ }),

/***/ "./src/admin/extend.js":
/*!*****************************!*\
  !*** ./src/admin/extend.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_SettingsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SettingsPage */ "./src/admin/components/SettingsPage.tsx");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Admin)().page(_components_SettingsPage__WEBPACK_IMPORTED_MODULE_2__["default"])]);

/***/ }),

/***/ "./src/admin/index.tsx":
/*!*****************************!*\
  !*** ./src/admin/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_SettingsPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/SettingsPage */ "./src/admin/components/SettingsPage.tsx");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extend */ "./src/admin/extend.js");



flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('walsgit/recycle-bin', () => {
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().registry.for('walsgit-recycle-bin').registerPage(_components_SettingsPage__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "flarum/admin/app":
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/app')" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'admin/app');

/***/ }),

/***/ "flarum/admin/components/ExtensionPage":
/*!***************************************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/components/ExtensionPage')" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'admin/components/ExtensionPage');

/***/ }),

/***/ "flarum/common/components/Button":
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Button')" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Button');

/***/ }),

/***/ "flarum/common/components/Form":
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Form')" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Form');

/***/ }),

/***/ "flarum/common/components/FormModal":
/*!************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/FormModal')" ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/FormModal');

/***/ }),

/***/ "flarum/common/components/Icon":
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Icon')" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Icon');

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!*******************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/LoadingIndicator')" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/LoadingIndicator');

/***/ }),

/***/ "flarum/common/components/Page":
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Page')" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Page');

/***/ }),

/***/ "flarum/common/extenders":
/*!*************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extenders')" ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/extenders');

/***/ }),

/***/ "flarum/common/helpers/humanTime":
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/helpers/humanTime')" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/helpers/humanTime');

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/ItemList')" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/ItemList');

/***/ }),

/***/ "flarum/common/utils/Stream":
/*!****************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/Stream')" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/Stream');

/***/ }),

/***/ "flarum/common/utils/classList":
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/classList')" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/classList');

/***/ }),

/***/ "flarum/common/utils/extractText":
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/extractText')" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/extractText');

/***/ }),

/***/ "flarum/common/utils/string":
/*!****************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/string')" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/string');

/***/ }),

/***/ "flarum/common/utils/throttleDebounce":
/*!**************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/throttleDebounce')" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/throttleDebounce');

/***/ }),

/***/ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ }),

/***/ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}


/***/ }),

/***/ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}


/***/ }),

/***/ "./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/flarum-webpack-config/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		flarum.reg._webpack_runtimes["walsgit-recycle-bin"] ||= __webpack_require__;// Check if module is in cache
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _src_admin__WEBPACK_IMPORTED_MODULE_0__.extend)
/* harmony export */ });
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.tsx");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map