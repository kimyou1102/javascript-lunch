var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _toggleAddModalShow, _Header_instances, handleButtonClick_fn, _RestaurantListItem_instances, handleButtonClick_fn2, _RestaurantForm_instances, handleFormChange_fn, validateLink_fn, handleSubmit_fn, getFormQuery_fn, resetFormData_fn, closeModal_fn, _restaurantList, _selectedTab, _updateSelected, _list, _updateList, _selectValue, _handleClick, _options, _type, _onChange, _value, _restaurantList2, _updateList2, _selectedTab2, _category, _sorting, _handleCategoryChange, _handleSortingChange, _restaurant, _restaurantList3, _updateList3, _toggleModal, _onDelete, _selectedTab3, _restaurantList4, _category2, _sorting2, _addModalShow, _detailModalShow, _selectedRestaurant, _updateBookmark, _onRestaurantItemDelete, _toggleDetailModalShow, _toggleAddModalShow2, _renderDetailModal, _renderAddModal, _renderModal, _updateSelectValue, _updateRestautantList, _updateLocalRestautantList, _updateSelected2, _App_instances, updateRestaurantListUI_fn, resetForm_fn, renderRestaurantList_fn, renderFilterAndNavigation_fn, initElement_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const LABEL_NAMES = Object.freeze({
  category: "카테고리",
  name: "이름",
  distance: "거리(도보 이동 시간)",
  description: "설명",
  link: "참고 링크"
});
const DISTANCE = ["5", "10", "15", "20", "30"];
const CATEGORY = ["한식", "중식", "일식", "양식", "아시안", "기타"];
const SORTING = ["이름순", "거리순"];
const CATEGORY_ASSETS = Object.freeze({
  한식: "./assets/category-korean.png",
  중식: "./assets/category-chinese.png",
  일식: "./assets/category-japanese.png",
  양식: "./assets/category-western.png",
  아시안: "./assets/category-asian.png",
  기타: "./assets/category-etc.png"
});
const EVENT_TYPES = Object.freeze({
  click: "click",
  submit: "submit",
  input: "input"
});
const BUTTON_TYPES = Object.freeze({
  add: "add",
  cancel: "cancel",
  delete: "delete",
  close: "close"
});
const BUTTON_TEXTS = Object.freeze({
  [BUTTON_TYPES.add]: "추가하기",
  [BUTTON_TYPES.cancel]: "취소하기",
  [BUTTON_TYPES.delete]: "삭제하기",
  [BUTTON_TYPES.close]: "닫기"
});
class Header {
  constructor(toggleAddModalShow) {
    __privateAdd(this, _Header_instances);
    __privateAdd(this, _toggleAddModalShow);
    __privateSet(this, _toggleAddModalShow, toggleAddModalShow);
  }
  render() {
    const $header = document.createElement("header");
    $header.className = "gnb";
    const $title = document.createElement("h1");
    $title.textContent = "점심 뭐 먹지";
    $title.className = "gnb__title text-title";
    const $button = document.createElement("button");
    $button.className = "gnb__button";
    $button.setAttribute("aria-label", "음식점 추가");
    $button.type = "button";
    const $img = document.createElement("img");
    $img.setAttribute("src", "./assets/add-button.png");
    $img.setAttribute("alt", "음식점 추가");
    $header.appendChild($title);
    $button.appendChild($img);
    $header.appendChild($button);
    $button.addEventListener(
      EVENT_TYPES.click,
      __privateMethod(this, _Header_instances, handleButtonClick_fn).bind(this)
    );
    return $header;
  }
}
_toggleAddModalShow = new WeakMap();
_Header_instances = new WeakSet();
handleButtonClick_fn = function() {
  __privateGet(this, _toggleAddModalShow).call(this);
};
class RestaurantListItem {
  constructor(restaurantInfo, updateBookmark) {
    __privateAdd(this, _RestaurantListItem_instances);
    this.restaurantInfo = restaurantInfo;
    this.updateBookmark = updateBookmark;
  }
  render() {
    const { name, category, description, distance, bookmark, id } = this.restaurantInfo;
    const $item = document.createElement("li");
    $item.className = "restaurant";
    $item.id = id;
    const $category = document.createElement("div");
    $category.className = "restaurant__category";
    const $categoryImg = document.createElement("img");
    $categoryImg.className = "category-icon";
    $categoryImg.src = CATEGORY_ASSETS[category];
    $categoryImg.setAttribute("alt", category);
    const $info = document.createElement("div");
    $info.className = "restaurant__info";
    const $name = document.createElement("h3");
    $name.className = "restaurant__name text-subtitle";
    $name.textContent = name;
    const $distance = document.createElement("span");
    $distance.className = "restaurant__distance text-body";
    $distance.textContent = `캠퍼스부터 ${distance}분 내`;
    const $description = document.createElement("p");
    $description.className = "restaurant__description text-body";
    $description.textContent = description;
    const $bookmarkButton = document.createElement("button");
    $bookmarkButton.className = "restaurant__bookmark";
    const $bookmarkIcon = document.createElement("img");
    $bookmarkIcon.setAttribute(
      "src",
      `./assets/favorite-icon-${bookmark ? "filled" : "lined"}.png`
    );
    $item.appendChild($category);
    $item.appendChild($info);
    $category.appendChild($categoryImg);
    $info.appendChild($name);
    $info.appendChild($distance);
    $info.appendChild($description);
    $bookmarkButton.appendChild($bookmarkIcon);
    $item.appendChild($bookmarkButton);
    $bookmarkButton.addEventListener(
      "click",
      () => __privateMethod(this, _RestaurantListItem_instances, handleButtonClick_fn2).call(this, $bookmarkIcon)
    );
    return $item;
  }
}
_RestaurantListItem_instances = new WeakSet();
handleButtonClick_fn2 = function($bookmarkIcon) {
  const src = $bookmarkIcon.getAttribute("src");
  const id = this.restaurantInfo.id;
  if (src === "./assets/favorite-icon-lined.png") {
    $bookmarkIcon.setAttribute("src", "./assets/favorite-icon-filled.png");
    this.updateBookmark(id, true);
  }
  if (src === "./assets/favorite-icon-filled.png") {
    $bookmarkIcon.setAttribute("src", "./assets/favorite-icon-lined.png");
    this.updateBookmark(id, false);
  }
};
class RestaurantList {
  constructor(restaurantList, updateBookmark, onRestaurantItemClick) {
    this.restaurantList = restaurantList;
    this.updateBookmark = updateBookmark;
    this.onRestaurantItemClick = onRestaurantItemClick;
  }
  render() {
    const $listSection = document.createElement("section");
    $listSection.className = "restaurant-list-container";
    const $list = document.createElement("ul");
    $list.className = "restaurant-list";
    $listSection.appendChild($list);
    this.restaurantList.forEach(
      (restaurantInfo) => $list.appendChild(
        new RestaurantListItem(restaurantInfo, this.updateBookmark).render()
      )
    );
    $list.addEventListener("click", this.onRestaurantItemClick);
    return $listSection;
  }
}
class BottomSheetBase {
  constructor({ title, $children, show, toggleShow, id }) {
    this.title = title;
    this.$children = $children;
    this.$modal = document.createElement("div");
    this.show = show;
    this.toggleShow = toggleShow;
    this.id = id;
  }
  render() {
    this.$modal.className = "modal";
    this.$modal.id = this.id;
    const $backdrop = document.createElement("div");
    $backdrop.className = "modal-backdrop";
    const $container = document.createElement("div");
    $container.className = "modal-container";
    const $title = document.createElement("h2");
    if (this.title) {
      $title.className = "modal-title text-title";
      $title.textContent = this.title;
      $container.appendChild($title);
    }
    this.$modal.appendChild($backdrop);
    this.$modal.appendChild($container);
    if (this.$children) {
      $container.appendChild(this.$children);
    }
    $backdrop.addEventListener(EVENT_TYPES.click, this.toggleShow);
    if (this.show) this.$modal.classList.add("modal--open");
    return this.$modal;
  }
}
const actionVariant = {
  add: "primary",
  cancel: "secondary",
  close: "primary",
  delete: "secondary"
};
class Button {
  constructor({ type = "button", text, action }) {
    this.type = type;
    this.text = text;
    this.action = action;
  }
  render() {
    const $button = document.createElement("button");
    $button.type = this.type;
    $button.textContent = this.text;
    $button.className = `button button--${actionVariant[this.action]} text-caption`;
    return $button;
  }
}
class LinkInput {
  render() {
    const $linkFormItem = document.createElement("div");
    $linkFormItem.className = "form-item";
    const $linkLabel = document.createElement("label");
    $linkLabel.setAttribute("for", "link");
    $linkLabel.textContent = LABEL_NAMES.link;
    const $linkInput = document.createElement("input");
    $linkInput.type = "text";
    $linkInput.setAttribute("name", "link");
    $linkInput.id = "link";
    const $linkHelpText = document.createElement("span");
    $linkHelpText.className = "help-text text-caption";
    $linkHelpText.textContent = "매장 정보를 확인할 수 있는 링크를 입력해 주세요.";
    $linkFormItem.appendChild($linkLabel);
    $linkFormItem.appendChild($linkInput);
    $linkFormItem.appendChild($linkHelpText);
    return $linkFormItem;
  }
}
class NameInput {
  render() {
    const $nameFormItem = document.createElement("div");
    $nameFormItem.className = "form-item form-item--required";
    const $nameLabel = document.createElement("label");
    $nameLabel.setAttribute("for", "name");
    $nameLabel.textContent = LABEL_NAMES.name;
    const $nameInput = document.createElement("input");
    $nameInput.type = "text";
    $nameInput.setAttribute("name", "name");
    $nameInput.id = "name";
    $nameInput.required = true;
    $nameFormItem.appendChild($nameLabel);
    $nameFormItem.appendChild($nameInput);
    return $nameFormItem;
  }
}
class DescriptionInput {
  render() {
    const $descriptionFormItem = document.createElement("div");
    $descriptionFormItem.className = "form-item";
    const $descriptionLabel = document.createElement("label");
    $descriptionLabel.setAttribute("for", "description");
    $descriptionLabel.textContent = LABEL_NAMES.description;
    const $descriptionTextarea = document.createElement("textarea");
    $descriptionTextarea.id = "description";
    $descriptionTextarea.setAttribute("name", "description");
    $descriptionTextarea.setAttribute("cols", "30");
    $descriptionTextarea.setAttribute("rows", "5");
    const $descriptionHelpText = document.createElement("span");
    $descriptionHelpText.className = "help-text text-caption";
    $descriptionHelpText.textContent = "메뉴 등 추가 정보를 입력해 주세요.";
    $descriptionFormItem.appendChild($descriptionLabel);
    $descriptionFormItem.appendChild($descriptionTextarea);
    $descriptionFormItem.appendChild($descriptionHelpText);
    return $descriptionFormItem;
  }
}
class SelectBox {
  constructor({ label, options }) {
    this.label = label;
    this.options = options;
  }
  render() {
    const $formItem = document.createElement("div");
    $formItem.className = "form-item form-item--required";
    const $label = document.createElement("label");
    $label.setAttribute("for", this.label);
    $label.textContent = LABEL_NAMES[this.label];
    const $select = document.createElement("select");
    $select.setAttribute("name", this.label);
    $select.required = true;
    $select.id = this.label;
    const $defaultOption = document.createElement("option");
    $defaultOption.value = "";
    $defaultOption.textContent = "선택해 주세요";
    $formItem.appendChild($label);
    $formItem.appendChild($select);
    $select.appendChild($defaultOption);
    this.options.forEach((option) => {
      const $option = document.createElement("option");
      $option.value = option;
      if (this.label === "distance") $option.textContent = `${option}분 내`;
      if (this.label === "category") $option.textContent = option;
      $select.appendChild($option);
    });
    return $formItem;
  }
}
class CategorySelect {
  render() {
    const $categorySelect = new SelectBox({
      label: "category",
      options: CATEGORY
    }).render();
    return $categorySelect;
  }
}
class DistanceSelect {
  render() {
    const $distanceSelect = new SelectBox({
      label: "distance",
      options: DISTANCE
    }).render();
    return $distanceSelect;
  }
}
const extractValuesByKey = (obj, valueKey) => Object.entries(obj).reduce((acc, [key, value]) => {
  acc[key] = value[valueKey];
  return acc;
}, {});
class RestaurantForm {
  constructor(updateList, list) {
    __privateAdd(this, _RestaurantForm_instances);
    this.updateList = updateList;
    this.list = list;
  }
  render() {
    const $form = document.createElement("form");
    const $categoryFormItem = new CategorySelect().render();
    const $nameFormItem = new NameInput().render();
    const $distanceFormItem = new DistanceSelect().render();
    const $descriptionFormItem = new DescriptionInput().render();
    const $linkFormItem = new LinkInput().render();
    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "button-container";
    const $cancelButton = new Button({
      text: BUTTON_TEXTS.cancel,
      action: BUTTON_TYPES.cancel
    }).render();
    const $addButton = new Button({
      type: "submit",
      text: BUTTON_TEXTS.add,
      action: BUTTON_TYPES.add
    }).render();
    $addButton.disabled = true;
    $addButton.classList.add("disabled-btn");
    $form.appendChild($categoryFormItem);
    $form.appendChild($nameFormItem);
    $form.appendChild($distanceFormItem);
    $form.appendChild($descriptionFormItem);
    $form.appendChild($linkFormItem);
    $form.appendChild($buttonContainer);
    $buttonContainer.appendChild($cancelButton);
    $buttonContainer.appendChild($addButton);
    $cancelButton.addEventListener(
      EVENT_TYPES.click,
      __privateMethod(this, _RestaurantForm_instances, closeModal_fn).bind(this)
    );
    $form.addEventListener(EVENT_TYPES.submit, __privateMethod(this, _RestaurantForm_instances, handleSubmit_fn).bind(this));
    $form.addEventListener(
      EVENT_TYPES.input,
      __privateMethod(this, _RestaurantForm_instances, handleFormChange_fn).bind(this)
    );
    return $form;
  }
}
_RestaurantForm_instances = new WeakSet();
handleFormChange_fn = function(e) {
  const category = document.querySelector("#category").value;
  const name = document.querySelector("#name").value;
  const distance = document.querySelector("#distance").value;
  const link = document.querySelector("#link").value;
  const $addButton = document.querySelector(".button--primary");
  if (category !== "" && name !== "" && distance !== "") {
    $addButton.disabled = false;
    $addButton.classList.remove("disabled-btn");
  }
  if ($addButton.classList.contains("disabled-btn")) return;
  if (link !== "" && !__privateMethod(this, _RestaurantForm_instances, validateLink_fn).call(this, link)) {
    $addButton.disabled = true;
    $addButton.classList.add("disabled-btn");
  }
};
validateLink_fn = function(link) {
  try {
    new URL(link.trim());
    return true;
  } catch (err) {
    return false;
  }
};
handleSubmit_fn = function(e) {
  e.preventDefault();
  const formQuery = __privateMethod(this, _RestaurantForm_instances, getFormQuery_fn).call(this);
  const newRestaurantInfo = extractValuesByKey(formQuery, "value");
  this.updateList([
    ...this.list,
    { ...newRestaurantInfo, bookmark: false, id: (/* @__PURE__ */ new Date()).getTime() }
  ]);
  __privateMethod(this, _RestaurantForm_instances, resetFormData_fn).call(this, formQuery);
  __privateMethod(this, _RestaurantForm_instances, closeModal_fn).call(this);
};
getFormQuery_fn = function() {
  const category = document.querySelector("#category");
  const name = document.querySelector("#name");
  const distance = document.querySelector("#distance");
  const description = document.querySelector("#description");
  const link = document.querySelector("#link");
  return { category, name, distance, description, link };
};
resetFormData_fn = function({ category, name, distance, description, link }) {
  category.value = "";
  name.value = "";
  distance.value = "";
  description.value = "";
  link.value = "";
};
closeModal_fn = function() {
  const $modal = document.querySelector(".modal");
  $modal.classList.remove("modal--open");
};
class RestaurantListModel {
  constructor(restaurantList) {
    __privateAdd(this, _restaurantList);
    __privateSet(this, _restaurantList, restaurantList);
  }
  updateRestautantList(newRestaurantList) {
    __privateSet(this, _restaurantList, [...newRestaurantList]);
  }
  getRestaurantList() {
    return __privateGet(this, _restaurantList);
  }
}
_restaurantList = new WeakMap();
class RestaurantNavigator {
  constructor(selectedTab, updateSelected, list, updateList, selectValue) {
    __privateAdd(this, _selectedTab);
    __privateAdd(this, _updateSelected);
    __privateAdd(this, _list);
    __privateAdd(this, _updateList);
    __privateAdd(this, _selectValue);
    __privateAdd(this, _handleClick, (e) => {
      let filteredList = [];
      const { id } = e.target;
      if (id === "all") {
        filteredList = [...__privateGet(this, _list)];
      }
      if (id === "bookmark") {
        filteredList = __privateGet(this, _list).filter((restaurant) => restaurant.bookmark);
      }
      const { category, sorting } = __privateGet(this, _selectValue);
      if (category !== "전체") {
        filteredList = filteredList.filter(
          (restaurant) => restaurant.category === category
        );
      }
      if (sorting === "이름순") {
        filteredList = filteredList.sort(
          (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      }
      if (sorting === "거리순") {
        filteredList = filteredList.sort((a, b) => a.distance - b.distance);
      }
      __privateGet(this, _updateSelected).call(this, id);
      __privateGet(this, _updateList).call(this, filteredList);
    });
    __privateSet(this, _selectedTab, selectedTab);
    __privateSet(this, _updateSelected, updateSelected);
    __privateSet(this, _list, list);
    __privateSet(this, _updateList, updateList);
    __privateSet(this, _selectValue, selectValue);
    this.$restaurantLitsHeader = document.createElement("div");
  }
  render() {
    this.$restaurantLitsHeader.replaceChildren();
    this.$restaurantLitsHeader.className = "restaurant-list-header";
    const $leftButton = document.createElement("button");
    $leftButton.classList.add("select-button");
    $leftButton.textContent = "모든 음식점";
    $leftButton.id = "all";
    const $rightButton = document.createElement("button");
    $rightButton.classList.add("select-button");
    $rightButton.textContent = "자주 가는 음식점";
    $rightButton.id = "bookmark";
    if (__privateGet(this, _selectedTab) === "all") {
      $leftButton.classList.add("selected");
      $rightButton.classList.remove("selected");
    }
    if (__privateGet(this, _selectedTab) === "bookmark") {
      $rightButton.classList.add("selected");
      $leftButton.classList.remove("selected");
    }
    this.$restaurantLitsHeader.appendChild($leftButton);
    this.$restaurantLitsHeader.appendChild($rightButton);
    this.$restaurantLitsHeader.addEventListener("click", __privateGet(this, _handleClick));
    return this.$restaurantLitsHeader;
  }
}
_selectedTab = new WeakMap();
_updateSelected = new WeakMap();
_list = new WeakMap();
_updateList = new WeakMap();
_selectValue = new WeakMap();
_handleClick = new WeakMap();
class RestaurantFilter {
  constructor(options, type, onChange, value) {
    __privateAdd(this, _options);
    __privateAdd(this, _type);
    __privateAdd(this, _onChange);
    __privateAdd(this, _value);
    __privateSet(this, _options, options);
    __privateSet(this, _type, type);
    __privateSet(this, _onChange, onChange);
    __privateSet(this, _value, value);
  }
  render() {
    const $select = document.createElement("select");
    $select.className = "restaurant-filter";
    $select.id = `${__privateGet(this, _type)}-filter`;
    $select.setAttribute("name", __privateGet(this, _type));
    const $defaultOption = document.createElement("option");
    $defaultOption.value = __privateGet(this, _options)[0];
    $defaultOption.textContent = __privateGet(this, _options)[0];
    $select.appendChild($defaultOption);
    __privateGet(this, _options).slice(1).forEach((option) => {
      const $option = document.createElement("option");
      $option.value = option;
      $option.textContent = option;
      $select.appendChild($option);
    });
    $select.value = __privateGet(this, _value);
    $select.addEventListener("change", __privateGet(this, _onChange));
    return $select;
  }
}
_options = new WeakMap();
_type = new WeakMap();
_onChange = new WeakMap();
_value = new WeakMap();
class RestaurantFilterSection {
  constructor(restaurantList, updateList, selectedTab, category, sorting, updateSelectValue) {
    __privateAdd(this, _restaurantList2);
    __privateAdd(this, _updateList2);
    __privateAdd(this, _selectedTab2);
    __privateAdd(this, _category);
    __privateAdd(this, _sorting);
    __privateAdd(this, _handleCategoryChange, (e) => {
      const { value } = e.target;
      let filterBySelectTab = [...__privateGet(this, _restaurantList2)];
      const sotring = document.querySelector("#sorting-filter").value;
      if (sotring === "이름순") {
        filterBySelectTab = filterBySelectTab.sort(
          (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      }
      if (sotring === "거리순") {
        filterBySelectTab = filterBySelectTab.sort(
          (a, b) => a.distance - b.distance
        );
      }
      if (__privateGet(this, _selectedTab2) === "bookmark") {
        filterBySelectTab = filterBySelectTab.filter(
          (restaurant) => restaurant.bookmark
        );
      }
      if (value === "전체") {
        __privateGet(this, _updateList2).call(this, filterBySelectTab);
        this.updateSelectValue(value, "category");
        return;
      }
      const filteredList = filterBySelectTab.filter(
        (restaurant) => restaurant.category === value
      );
      __privateGet(this, _updateList2).call(this, filteredList);
      this.updateSelectValue(value, "category");
    });
    __privateAdd(this, _handleSortingChange, (e) => {
      const { value } = e.target;
      let filterBySelectTab = [...__privateGet(this, _restaurantList2)];
      const category = document.querySelector("#category-filter").value;
      if (category !== "전체") {
        filterBySelectTab = filterBySelectTab.filter(
          (restaurant) => restaurant.category === category
        );
      }
      if (__privateGet(this, _selectedTab2) === "bookmark") {
        filterBySelectTab = filterBySelectTab.filter(
          (restaurant) => restaurant.bookmark
        );
      }
      if (value === "이름순") {
        const filteredList = filterBySelectTab.sort(
          (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        __privateGet(this, _updateList2).call(this, filteredList);
      }
      if (value === "거리순") {
        __privateGet(this, _updateList2).call(this, filterBySelectTab.sort((a, b) => a.distance - b.distance));
      }
      this.updateSelectValue(value, "sorting");
    });
    __privateSet(this, _restaurantList2, restaurantList);
    __privateSet(this, _updateList2, updateList);
    __privateSet(this, _selectedTab2, selectedTab);
    __privateSet(this, _category, category);
    __privateSet(this, _sorting, sorting);
    this.updateSelectValue = updateSelectValue;
  }
  render() {
    const $section = document.createElement("section");
    $section.className = "restaurant-filter-container";
    $section.appendChild(
      new RestaurantFilter(
        ["전체", ...CATEGORY],
        "category",
        __privateGet(this, _handleCategoryChange),
        __privateGet(this, _category)
      ).render()
    );
    $section.appendChild(
      new RestaurantFilter(
        SORTING,
        "sorting",
        __privateGet(this, _handleSortingChange),
        __privateGet(this, _sorting)
      ).render()
    );
    return $section;
  }
}
_restaurantList2 = new WeakMap();
_updateList2 = new WeakMap();
_selectedTab2 = new WeakMap();
_category = new WeakMap();
_sorting = new WeakMap();
_handleCategoryChange = new WeakMap();
_handleSortingChange = new WeakMap();
const isQuotaExceededError = (err) => {
  return err instanceof DOMException && (err.code === 22 || err.code === 1014 || err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED");
};
const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (isQuotaExceededError(err)) {
      alert("현재 사용 가능한 스토리지 공간이 부족합니다.");
    } else {
      alert("예기치 못한 오류가 발생했습니다.");
    }
  }
};
const getItem = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return defaultValue;
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};
const RESTAURANT_LIST_KEY = "restaurantList";
class RestaurantDetail {
  constructor(restaurant, restaurantList, updateList, toggleModal, onDelete) {
    __privateAdd(this, _restaurant);
    __privateAdd(this, _restaurantList3);
    __privateAdd(this, _updateList3);
    __privateAdd(this, _toggleModal);
    __privateAdd(this, _onDelete);
    __privateSet(this, _restaurant, restaurant);
    __privateSet(this, _restaurantList3, restaurantList);
    __privateSet(this, _updateList3, updateList);
    __privateSet(this, _toggleModal, toggleModal);
    __privateSet(this, _onDelete, onDelete);
  }
  render() {
    const $div = document.createElement("div");
    const $link = document.createElement("a");
    const $text = document.createElement("p");
    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "button-container";
    const $deleteButton = new Button({
      text: BUTTON_TEXTS.delete,
      action: BUTTON_TYPES.delete
    }).render();
    const $closeButton = new Button({
      text: BUTTON_TEXTS.close,
      action: BUTTON_TYPES.close
    }).render();
    const $item = new RestaurantListItem(
      __privateGet(this, _restaurant),
      __privateGet(this, _restaurantList3),
      __privateGet(this, _updateList3)
    ).render();
    $item.classList.add("restaurant-detail");
    $div.appendChild($item);
    const link = __privateGet(this, _restaurant).link;
    if (link !== "") {
      $link.setAttribute("href", link);
      $link.textContent = link;
      $div.appendChild($link);
    }
    if (link === "") {
      $text.textContent = "주소가 없습니다.";
      $div.appendChild($text);
    }
    $buttonContainer.appendChild($deleteButton);
    $buttonContainer.appendChild($closeButton);
    $div.appendChild($buttonContainer);
    $deleteButton.addEventListener(
      "click",
      () => __privateGet(this, _onDelete).call(this, __privateGet(this, _restaurant).id)
    );
    $closeButton.addEventListener("click", __privateGet(this, _toggleModal));
    return $div;
  }
}
_restaurant = new WeakMap();
_restaurantList3 = new WeakMap();
_updateList3 = new WeakMap();
_toggleModal = new WeakMap();
_onDelete = new WeakMap();
class App {
  constructor() {
    __privateAdd(this, _App_instances);
    __privateAdd(this, _selectedTab3);
    __privateAdd(this, _restaurantList4);
    __privateAdd(this, _category2);
    __privateAdd(this, _sorting2);
    __privateAdd(this, _addModalShow);
    __privateAdd(this, _detailModalShow);
    __privateAdd(this, _selectedRestaurant);
    __publicField(this, "onRestaurantItemClick", (e) => {
      if (e.target.closest(".restaurant__bookmark")) return;
      const id = Number(e.target.closest(".restaurant").id);
      const restaurant = __privateGet(this, _restaurantList4).find(
        (restaurant2) => restaurant2.id === id
      );
      __privateSet(this, _selectedRestaurant, restaurant);
      __privateGet(this, _toggleDetailModalShow).call(this);
    });
    __privateAdd(this, _updateBookmark, (id, isBookmark) => {
      const originRestaurantList = this.restaurantListModel.getRestaurantList();
      const index = __privateGet(this, _restaurantList4).findIndex(
        (restaurant) => restaurant.id === id
      );
      const originIndex = originRestaurantList.findIndex(
        (restaurant) => restaurant.id === id
      );
      const copy = [...__privateGet(this, _restaurantList4)];
      const originCopy = [...originRestaurantList];
      copy[index] = { ...copy[index], bookmark: isBookmark };
      originCopy[originIndex] = {
        ...originCopy[originIndex],
        bookmark: isBookmark
      };
      __privateGet(this, _updateLocalRestautantList).call(this, originCopy);
      __privateGet(this, _updateRestautantList).call(this, copy);
    });
    __privateAdd(this, _onRestaurantItemDelete, (id) => {
      const restaurantIndex = __privateGet(this, _restaurantList4).findIndex(
        (restaurant) => restaurant.id === id
      );
      const restaurantList = this.restaurantListModel.getRestaurantList();
      const newList = restaurantList.filter((_, i) => i !== restaurantIndex);
      __privateGet(this, _updateLocalRestautantList).call(this, newList);
      __privateGet(this, _toggleDetailModalShow).call(this);
    });
    __privateAdd(this, _toggleDetailModalShow, () => {
      __privateSet(this, _detailModalShow, !__privateGet(this, _detailModalShow));
      __privateGet(this, _renderDetailModal).call(this);
    });
    __privateAdd(this, _toggleAddModalShow2, () => {
      __privateSet(this, _addModalShow, !__privateGet(this, _addModalShow));
      __privateGet(this, _renderAddModal).call(this);
    });
    __privateAdd(this, _renderDetailModal, () => {
      const $restaurantDetail = new RestaurantDetail(
        __privateGet(this, _selectedRestaurant),
        __privateGet(this, _restaurantList4),
        __privateGet(this, _updateLocalRestautantList),
        __privateGet(this, _toggleDetailModalShow),
        __privateGet(this, _onRestaurantItemDelete)
      ).render();
      __privateGet(this, _renderModal).call(this, "#datail-modal", $restaurantDetail, {
        show: __privateGet(this, _detailModalShow),
        toggleShow: __privateGet(this, _toggleDetailModalShow)
      });
    });
    __privateAdd(this, _renderAddModal, () => {
      const $restaurantForm = new RestaurantForm(
        __privateGet(this, _updateLocalRestautantList),
        __privateGet(this, _restaurantList4)
      ).render();
      __privateGet(this, _renderModal).call(this, "#add-modal", $restaurantForm, {
        title: "새로운 음식점",
        show: __privateGet(this, _addModalShow),
        toggleShow: __privateGet(this, _toggleAddModalShow2)
      });
    });
    __privateAdd(this, _renderModal, (modalId, innerComponent, options = {}) => {
      const $modal = document.querySelector(modalId);
      const bottomSheetOptions = {
        $children: innerComponent,
        id: modalId.replace("#", ""),
        ...options
      };
      $modal.replaceWith(new BottomSheetBase(bottomSheetOptions).render());
    });
    __privateAdd(this, _updateSelectValue, (value, type) => {
      if (type === "category") __privateSet(this, _category2, value);
      if (type === "sorting") __privateSet(this, _sorting2, value);
      __privateMethod(this, _App_instances, renderFilterAndNavigation_fn).call(this);
    });
    __privateAdd(this, _updateRestautantList, (newRestaurantList) => {
      __privateSet(this, _restaurantList4, newRestaurantList);
      __privateMethod(this, _App_instances, updateRestaurantListUI_fn).call(this);
    });
    __privateAdd(this, _updateLocalRestautantList, (newRestaurantList) => {
      this.restaurantListModel.updateRestautantList(newRestaurantList);
      setItem(RESTAURANT_LIST_KEY, newRestaurantList);
      __privateGet(this, _updateRestautantList).call(this, newRestaurantList);
    });
    __privateAdd(this, _updateSelected2, (selected) => {
      __privateSet(this, _selectedTab3, selected);
      __privateMethod(this, _App_instances, renderFilterAndNavigation_fn).call(this);
    });
    const originRestaurantList = getItem(RESTAURANT_LIST_KEY, []);
    this.restaurantListModel = new RestaurantListModel(originRestaurantList);
    __privateSet(this, _selectedTab3, "all");
    __privateSet(this, _restaurantList4, this.restaurantListModel.getRestaurantList());
    __privateSet(this, _category2, "전체");
    __privateSet(this, _sorting2, "이름순");
    __privateSet(this, _addModalShow, false);
    __privateSet(this, _detailModalShow, false);
    __privateSet(this, _selectedRestaurant, {});
    __privateMethod(this, _App_instances, initElement_fn).call(this);
  }
}
_selectedTab3 = new WeakMap();
_restaurantList4 = new WeakMap();
_category2 = new WeakMap();
_sorting2 = new WeakMap();
_addModalShow = new WeakMap();
_detailModalShow = new WeakMap();
_selectedRestaurant = new WeakMap();
_updateBookmark = new WeakMap();
_onRestaurantItemDelete = new WeakMap();
_toggleDetailModalShow = new WeakMap();
_toggleAddModalShow2 = new WeakMap();
_renderDetailModal = new WeakMap();
_renderAddModal = new WeakMap();
_renderModal = new WeakMap();
_updateSelectValue = new WeakMap();
_updateRestautantList = new WeakMap();
_updateLocalRestautantList = new WeakMap();
_updateSelected2 = new WeakMap();
_App_instances = new WeakSet();
updateRestaurantListUI_fn = function() {
  __privateMethod(this, _App_instances, renderRestaurantList_fn).call(this);
  __privateMethod(this, _App_instances, resetForm_fn).call(this);
};
resetForm_fn = function() {
  const $addButton = document.querySelector(".button--primary");
  $addButton.disabled = true;
  $addButton.classList.add("disabled-btn");
};
renderRestaurantList_fn = function() {
  const $listContainer = document.querySelector(".restaurant-list-container");
  this.$listSection.replaceChild(
    new RestaurantList(
      __privateGet(this, _restaurantList4),
      __privateGet(this, _updateBookmark),
      this.onRestaurantItemClick
    ).render(),
    $listContainer
  );
  __privateMethod(this, _App_instances, renderFilterAndNavigation_fn).call(this);
};
renderFilterAndNavigation_fn = function() {
  const restaurantList = this.restaurantListModel.getRestaurantList();
  const $filterSection = document.querySelector(
    ".restaurant-filter-container"
  );
  $filterSection.replaceWith(
    new RestaurantFilterSection(
      restaurantList,
      __privateGet(this, _updateRestautantList),
      __privateGet(this, _selectedTab3),
      __privateGet(this, _category2),
      __privateGet(this, _sorting2),
      __privateGet(this, _updateSelectValue)
    ).render()
  );
  const $tap = document.querySelector(".restaurant-list-header");
  $tap.replaceWith(
    new RestaurantNavigator(
      __privateGet(this, _selectedTab3),
      __privateGet(this, _updateSelected2),
      restaurantList,
      __privateGet(this, _updateRestautantList),
      { category: __privateGet(this, _category2), sorting: __privateGet(this, _sorting2) }
    ).render()
  );
};
initElement_fn = function() {
  const $body = document.querySelector("body");
  $body.appendChild(new Header(__privateGet(this, _toggleAddModalShow2)).render());
  const $main = document.createElement("main");
  $body.appendChild($main);
  this.$listSection = document.createElement("div");
  this.$listSection.className = "list-section";
  const $listHeader = new RestaurantNavigator(
    __privateGet(this, _selectedTab3),
    __privateGet(this, _updateSelected2),
    __privateGet(this, _restaurantList4),
    __privateGet(this, _updateRestautantList),
    { category: __privateGet(this, _category2), sorting: __privateGet(this, _sorting2) }
  ).render();
  const $filterSection = new RestaurantFilterSection(
    __privateGet(this, _restaurantList4),
    __privateGet(this, _updateRestautantList),
    __privateGet(this, _selectedTab3),
    __privateGet(this, _category2),
    __privateGet(this, _sorting2),
    __privateGet(this, _updateSelectValue)
  ).render();
  this.$listSection.append(
    $listHeader,
    $filterSection,
    new RestaurantList(
      __privateGet(this, _restaurantList4).sort(
        (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      ),
      __privateGet(this, _updateBookmark),
      this.onRestaurantItemClick
    ).render()
  );
  $main.appendChild(this.$listSection);
  const $restaurantForm = new RestaurantForm(
    __privateGet(this, _updateLocalRestautantList),
    __privateGet(this, _restaurantList4)
  ).render();
  $main.appendChild(
    new BottomSheetBase({
      title: "새로운 음식점",
      $children: $restaurantForm,
      show: __privateGet(this, _addModalShow),
      toggleShow: __privateGet(this, _toggleAddModalShow2),
      id: "add-modal"
    }).render()
  );
  $main.appendChild(
    new BottomSheetBase({
      show: __privateGet(this, _detailModalShow),
      toggleShow: __privateGet(this, _toggleDetailModalShow),
      id: "datail-modal"
    }).render()
  );
};
new App();
