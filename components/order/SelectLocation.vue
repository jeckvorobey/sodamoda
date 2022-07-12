<template>
  <div id="sls-69857" class="bx-sls 1">
    <div class="dropdown-block field field-city bx-ui-sls-input-block">
      <label class="form-element">
        <div class="field-name">{{ $t('checkout.city.title') }}</div>
        <span class="dropdown-icon"></span>
        <input type="text" autocomplete="off" name="ORDER_PROP_2" value="0000073738" class="form-field" :placeholder="$t('checkout.city.title')" style="display: none;">
        <div class="bx-ui-sls-container" style="margin: 0; padding: 0; border: none; position: relative;">
          <input type="text" disabled="disabled" v-model="cityPath" autocomplete="off" class="bx-ui-sls-route" style="padding: 15px 0 0 16px; margin: 0;">
          <input type="text" autocomplete="off" v-model="cityName" class="bx-ui-sls-fake" :placeholder="$t('checkout.city.title')" @input="searchInput(cityName)" :title="cityPath" @blur="onBlur">
          <div title="Clear selection" class="bx-ui-sls-clear" style="position: absolute; top: 0; right: 0; display: block;"></div>
        </div>
        <div class="dropdown-fade2white"></div>
        <div class="bx-ui-sls-loader"></div>
        <div class="bx-ui-sls-pane" :style="styleLocationSearch">
          <div class="bx-ui-sls-variants" v-if="(!isError || !isEmpty)">
            <div class="dropdown-item bx-ui-sls-variant" v-for="item in locationSearch" :key="item.CODE" @click="selectLocation(item)">
              <span class="dropdown-item-text" v-html="formattedLocationPath(item)"></span>
            </div>
          </div>
          <div class="bx-ui-sls-variants" v-if="(isError || isEmpty)">
            <div class="bx-ui-sls-error">
              <div></div>
              {{isError ? messageError : messageNothing}}
            </div>
          </div>
        </div>
      </label>
    </div>
    <div class="bx-ui-sls-error-message"></div>
  </div>
</template>

<script>
import global from "~/mixins/global";

let timerId
export default {
  name: "SelectLocation",
  mixins: [global],
  data(){
    return {
      messageError: this.$t('checkout.city.error'),
      messageNothing: this.$t('checkout.city.nothing'),
      cityName: '',
      cityPath: '',
      cityCode: '',
      showVariant: {overflow: 'hidden auto', display: 'block', bottom: 'auto'},
      hideVariant: {overflow: 'hidden auto', display: 'none', bottom: 'auto'}
    }
  },
  props: {
    location: Object,
  },
  computed: {
    locationPath(){
      return this.$store.getters['order/locationPath']
    },
    locationSearch(){
      return this.$store.getters['order/locationSearch']
    },
    isEmpty(){
      return this.$store.getters['order/searchIsEmpty']
    },
    isError(){
      return this.$store.getters['order/searchIsError']
    },
    styleLocationSearch(){
      return this.$store.getters['order/searchStyle']
    },
    errors(){
      return this.$store.getters['order/errors']
    }
  },
  watch: {
    location: async function(newVal) {
      this.cityName = newVal.DISPLAY
      this.cityCode = newVal.CODE
      await this.requestLocation()
      if(this.locationSearch.length > 0){
        this.selectLocation(this.locationSearch[0]);
      }
    },
    locationSearch: function (newVal){
      if(!newVal.length){
        this.$emit('select-location', {});
      }
    },
    cityName: function (newVal){
      let errors = Object.assign({}, this.errors)

      if(newVal.length > 0){
        errors.location = false
      }
      else {
        errors.location = true
      }
      this.$store.commit('order/SET_ORDER_ERRORS', errors)
    }
  },
  methods: {
    selectLocation(item){
      this.cityPath = this.titleLocationPath(item);
      this.cityCode = item.CODE;
      this.cityName = item.DISPLAY;
      this.$store.commit('order/SET_SEARCH_STYLE', this.hideVariant)

      this.$emit('select-location', item);
    },
    formattedLocationPath(search){
      let formatPath = '<span>'+search.DISPLAY+'</span>';
      let locPaths = this.locationPath;

      if(search.PATH.length > 0){
        search.PATH.forEach(item => {
          formatPath += ', ' + locPaths[item];
        })
      }
      return formatPath;
    },
    titleLocationPath(search){
      let formatPath = search.DISPLAY;
      let locPaths = this.locationPath;

      if(search.PATH.length > 0){
        search.PATH.forEach(item => {
          formatPath += ', ' + locPaths[item];
        })
      }
      return formatPath;
    },
    searchInput(){
      this.cityPath = '';
      clearTimeout(timerId);
      timerId = setTimeout(this.requestLocation, 500);
    },
    async requestLocation(){
      if(this.cityName){
        this.cursorLoaderStart()
        let formData = new FormData();
        formData.append('select[1]', 'CODE');
        formData.append('select[2]', 'TYPE_ID');
        formData.append('select[VALUE]', 'ID');
        formData.append('select[DISPLAY]', 'NAME.NAME');
        formData.append('additionals[1]', 'PATH');
        formData.append('filter[=PHRASE]', this.cityName);
        formData.append('filter[=NAME.LANGUAGE_ID]', 'ru');
        formData.append('filter[=SITE_ID]', 's1');
        formData.append('version', 2);
        formData.append('PAGE_SIZE', 10);
        formData.append('PAGE', 0);

        await this.$api_not_loader.$post('/bitrix/components/bitrix/sale.location.selector.search/get.php', formData).then(response => {
          let rs = {};
          let r = new RegExp("\x27+","g");
          let rsRequest = JSON.parse(response.replace(r,'"'));
          if(typeof rsRequest.data.ETC != 'undefined' && typeof rsRequest.data.ETC.PATH_ITEMS != 'undefined')
          {
            // deprecated begin
            for(var key in rsRequest.data.ETC.PATH_ITEMS){
              if(rsRequest.data.ETC.PATH_ITEMS[key].DISPLAY !== '') {
                rs[key] = rsRequest.data.ETC.PATH_ITEMS[key].DISPLAY;
              }
            }
            // deprecated end
            this.$store.commit('order/SET_LOCATION_PATH', rs)
            this.$store.commit('order/SET_LOCATION_SEARCH', rsRequest.data.ITEMS)
            this.$store.commit('order/SET_SEARCH_IS_ERROR', false)
            this.$store.commit('order/SET_SEARCH_IS_EMPTY', false)

            this.$store.commit('order/SET_SEARCH_STYLE', this.showVariant)
          }
          else{
            this.$store.commit('order/SET_LOCATION_PATH', {})
            this.$store.commit('order/SET_LOCATION_SEARCH', {})
            this.$store.commit('order/SET_SEARCH_IS_EMPTY', true)
            this.$store.commit('order/SET_SEARCH_STYLE', this.showVariant)
          }
        }, response => {
          console.log(response);
        })

        this.cursorLoaderStop()
      }
      else{
        this.$store.commit('order/SET_SEARCH_IS_ERROR', false)
        this.$store.commit('order/SET_SEARCH_IS_EMPTY', false)
        this.$store.commit('order/SET_SEARCH_STYLE', this.hideVariant)
      }
    },
    onBlur(){
      if(this.isEmpty){
        this.$emit('select-location', {});
        this.$store.commit('order/SET_SEARCH_STYLE', this.hideVariant)
      }
    }
  },
  async mounted() {
    this.cityName = this.location.DISPLAY;
    this.cityCode = this.location.CODE;
    await this.requestLocation();

    if(this.locationSearch.length > 0){
      this.selectLocation(this.locationSearch[0]);
    }
  }
};
</script>

<style scoped>
.bx-sls .dropdown-block {
  font-size: 14px;
  position: relative;
  background-color: #fff;
}

.bx-sls .dropdown-block .placeholder {
  top: -9px !important;
  font-size: 14px !important;
}

.field-city.active .bx-sls .dropdown-block {
  display: block;
}

.bx-sls .dropdown-block-ui {
  font-size: 14px;
  padding: 0 22px 0 30px;
  position: relative;
  background-color: #fff;
  margin-top: 5px;
}

.bx-sls .dropdown-arrow {
  height: 100%;
  top: 0;
  right: 0;
  position: absolute;
  width: 22px;
}

.bx-sls .bx-ui-sls-container {
  overflow: hidden;
  height: 54px;
  width: 100%;
  font-style: normal;
  border-radius: 0;
  color: #444;
  background-color: transparent;
  transition: all .2s ease;

  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  font-size: 16px;
  line-height: 19px;
  font-family: "Lato", sans-serif;
  font-weight: 400;
}

.bx-sls .bx-ui-sls-pane {
  border: 1px solid #8D8D8D;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: none;
  max-height: 250px;
  overflow-y: auto;
  left: 0;
  top: 78px;
  padding: 0;
  position: absolute;
  width: 100%;
}

.bx-sls .dropdown-active .bx-ui-sls-pane {
  display: block;
}

.bx-sls .bx-ui-sls-variants {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bx-sls .dropdown-item {
  border-radius: 2px;
  padding: 7px 4px 7px 10px;
}

.bx-sls .dropdown-item:hover {
  background-color: #f1f3f5;
  cursor: pointer;
}

.bx-sls .dropdown-img {
  border: none;
  display: inline-block;
  height: 12px;
  margin: 3px 12px 0 0;
  vertical-align: top;
  width: 16px;
}

.bx-sls .dropdown-item-text {
  /*makeup:color: #212121;*/
  color: #aba8ac;
  display: inline-block;
  /*max-width: 220px;*/ /*silly limitation*/
  vertical-align: top;
  font-size: 14px;
  line-height: 1.3;
}

.bx-sls .dropdown-item-text span{
  color: #25282c;
}

.bx-sls .dropdown-list-title {
  border-bottom: 1px solid #e5e5e5;
  height: 37px;
  line-height: 37px;
  padding-left: 8px;
}

.bx-sls .dropdown-icon {
  background: url(https://dev.bulvin.ru/bitrix/components/bitrix/sale.location.selector.search/templates/.default/images/lens.png) no-repeat center center;
  height: 14px;
  left: 10px;
  position: absolute;
  top: 10px;
  width: 14px;
  display: none;
}

.bx-sls .quick-locations{
  margin-bottom: 5px;
}
.bx-sls .quick-location-tag {
  background-color: #f2f5f8;
  border: 1px solid #cad3dc;
  border-radius: 3px;
  color: #1e55b9;
  display: inline-block;
  font-size: 15px;
  height: 27px;
  line-height: 26px;
  margin: 0 3px;
  padding: 0 14px;
  text-decoration: none;
  margin-bottom: 10px;
}
.bx-sls .quick-location-tag:hover{
  background-color: #fafafa;
}

.bx-sls .dropdown-fade2white {
  width: 46px;
  height: 31px;
  position: absolute;
  top: 33px;
  right: 5px;

  background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%);
  background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(30%,rgba(255,255,255,1)));
  background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 30%);
  background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 30%);
  background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 30%);
  background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 30%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );
}

.bx-sls .bx-ui-sls-clear {
  background: none;
  cursor: pointer;
  cursor: hand;
  position: absolute;
  top: 11px;
  right: 0;
  display: block;
}

.bx-sls .bx-ui-sls-clear .icon-clear {
  display: block;
}

.bx-sls .bx-ui-sls-loader{
  background-image: url(https://dev.bulvin.ru/bitrix/panel/main/images/waiter-white.gif) !important;
  background-repeat: no-repeat !important;
  background-position: right -1px !important;

  width: 30px;
  height: 30px;

  position: absolute;
  top: 3px;
  right: 2px;
  display: none;
}

.bx-sls .bx-ui-sls-go-edit{
  display: none;
}

.bx-sls .bx-ui-sls-pane {
  max-height: 250px;
}

.bx-sls input::-ms-clear {
  display: none;
}

.bx-sls input[type="text"]{
  position: relative;
}

.bx-sls .bx-ui-sls-fake,
.bx-sls .bx-ui-sls-route {
  position: absolute !important;
  top: 0;
  left: 0;

  color: #000 !important;

  opacity: 1 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;

  padding: 15px 16px 18px 16px !important;
  background-position: right 1px;
  background-repeat: no-repeat;


  height: 56px;
  width: 100%;
  outline: none;
  z-index:10;
}
.bx-sls .bx-ui-sls-route{
  color: #aba8ac !important;
  z-index:5;
}

.bx-sls .bx-ui-sls-pane {
  background-color: #fff;
  z-index: 999;
  border: 1px solid #8D8D8D;
}

.bx-sls .bx-ui-sls-variants .bx-ui-sls-variant,
.bx-sls .bx-ui-sls-error{
  padding: 10px 15px;
}
.bx-sls .bx-ui-sls-error{
  color: #ff2222;
  padding-left: 30px;
  position: relative;
}
.bx-sls .bx-ui-sls-error div{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 25px;
  height: 25px;
  background: url(https://dev.bulvin.ru/bitrix/panel/main/images/bx-admin-sprite-small.png) 6px -2895px no-repeat scroll;
}
.bx-sls .bx-ui-sls-variants .bx-ui-sls-variant:hover,
.bx-sls .bx-ui-sls-variant-active{
  background-color: #EFEFEF;
}

.adm-sls-edit-link{
  margin-top: 10px;
}

/* CSS-modes below: admin, public; */
.bx-admin-mode .bx-sls-go-edit{
  margin-left: 10px;
  display: none;
}

.bx-admin-mode .dropdown-block {
  border-color: #87919c #959ea9 #9ea7b1;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.3), 0 2px 2px -1px rgba(180, 188, 191, 0.7) inset;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.3), 0 2px 2px -1px rgba(180, 188, 191, 0.7) inset;
  height: 25px;
}

.bx-sls.bx-admin-mode .bx-ui-sls-fake,
.bx-sls.bx-admin-mode .bx-ui-sls-route {
  height: 25px;
}

.bx-admin-mode .dropdown-icon {
  top: 7px;
}

.bx-admin-mode .dropdown-fade2white {
  height: 22px;
}

.bx-admin-mode .dropdown-fade2white {
  right: 1px;
}

.bx-admin-mode .bx-ui-sls-clear {
  background-position: 6px -3389px;
  height: 22px;
}

.bx-admin-mode .bx-ui-sls-clear:hover{
  background-position: 6px -3421px;
}

.bx-admin-mode .bx-ui-sls-loader {
  background-position: right -4px !important;
  height: 21px;
}

.bx-admin-mode .bx-ui-sls-pane {
  top: 27px;
}


@media only screen and (max-width: 1024px) {

  .bx-sls .bx-ui-sls-pane {
    max-height: 220px;
  }

}
</style>
