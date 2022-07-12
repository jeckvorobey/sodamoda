<template>
  <div id="dragging-content">
    <div class="dragging-wrapper">
      <div class="close-dragging" :class="{ visible: closeDragShow }" @click="onCloseDrag">
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-times fa-w-10 fa-2x"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path>
        </svg>
      </div>
      <div class="dragging-field"></div>
      <div class="select-wrapper" :class="{ hidden: selectWrapperHidden }">
        <!-- multiple-select -->
        <div class="select-head" :class="{ hidden: selectHeadHidden }">
          <div class="info">
            <div class="title">{{ $i18n.locale !== 'ru' ? product.name_en : product.name }}</div>
            <div class="price">{{ $i18n.locale !== 'ru' ? product.price_en : product.price }}</div>
          </div>
          <div class="choices">
            <label class="filter-link big" data-filter="choice-red" :style="{background: item.hex}" v-for="item in propsData.colors.items">
              <span class="checkmark" :class="{active: color === item.value}" :style="{ borderColor: item.hex}"></span>
            </label>
          </div>
        </div>
        <div class="size-wrapper" v-show="!sizeWrapperHidden">
          <div class="size-title">{{ $t('catalog.sizeSelect') }}</div>
          <p>{{ $t('catalog.sizeTable') }}</p>
          <ul class="active filter-content">
            <li :class="{ active: sizeID === item.value }" v-for="item in propsData.sizes.items[color]" :key="color + '_' + item.value">
              <a href="javascript:void(0)" @click="onSize(item)">
                <p>{{ item.name }}</p>
                <span></span>
                <p></p>
              </a>
            </li>
          </ul>
        </div>
        <button type="button" class="btn" @click="sizeBtnAction" :class="{ showed: sizeBtnShow }">{{ messageBtn }}</button>
      </div>
      <section class="product-info-mobile">
        <div class="info">
          <div class="section-container">
            <div class="info-wrapper">
              <nuxt-link :to="'/catalog/' + sectionData.code + '/'" class="category-link">{{ $i18n.locale !== 'ru' ? sectionData.name_en : sectionData.name }}</nuxt-link>
              <div class="info-element">
                <div class="info-item">
                  <p>{{ $t('catalog.article') }}: {{ product.article }}</p>
                </div>
                <div class="info-item">
                  <a href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6685 4C19.6606 4 21 6.4136 21 8.8055C21 12.6765 15.8225 18.0494 12 20.7833C8.1775 18.0494 3 12.6765 3 8.8055C3 6.4136 4.3394 4 7.3316 4C8.11275 4.04485 8.87178 4.27616 9.54518 4.67458C10.2186 5.07299 10.7867 5.62692 11.2021 6.29L12 7.3466L12.7979 6.29C13.2133 5.62692 13.7815 5.07298 14.4549 4.67456C15.1283 4.27615 15.8873 4.04484 16.6685 4ZM16.6685 3C15.7327 3.04457 14.8211 3.31163 14.0092 3.77903C13.1972 4.24642 12.5085 4.90067 12 5.6875C11.4915 4.90068 10.8028 4.24644 9.99089 3.77905C9.17899 3.31166 8.26736 3.04459 7.3316 3C3.9564 3 2 5.5992 2 8.8055C2 13.5555 8.4583 19.6251 12 22C15.5417 19.6251 22 13.5555 22 8.8055C22 5.5992 20.0436 3 16.6685 3Z" fill="black"></path>
                      <path class="hover-background" d="M13.5503 4.76275L12.0347 6.43804L10.7785 5.10096L9.6831 3.87672L7.49235 3.52246L4.38248 4.24734L3.2236 5.63267L2.41797 7.5818L2.67557 9.98196L4.38248 13.6869L7.21781 17.408L12.0345 21.3868L15.82 18.4067L20.0887 13.2359L21.2002 11.1901L21.5224 8.41944L21.1035 6.66361L19.831 4.98833L18.3651 3.65125H15.7072L13.5503 4.76275Z" fill="black"></path>
                    </svg>
                    {{ $t('catalog.favorites') }}
                  </a>
                </div>
                <div class="info-item">
                  <p class="bold">{{ $i18n.locale !== 'ru' ? product.name_en : product.name }}</p>
                </div>
                <div class="info-item">
                  <p class="bold">{{ $i18n.locale !== 'ru' ? product.price_en : product.price }}</p>
                </div>
              </div>
              <p class="description" v-html="$i18n.locale !== 'ru' ? product.description_en : product.description"></p>
              <a href="javascript:void(0)" class="item-with-underline read-more" @click="toggleDescription" v-if="$i18n.locale !== 'ru' ? !!product.description_en : !!product.description">{{ $t('catalog.read') }}</a>
              <PropsView v-for="(prop, id) in propsData" :property="prop" :key="id"/>
              <div class="links-wrapper">
                <a href="#" class="link">{{ $t('catalog.stylist') }}</a>
                <a href="#" class="link">{{ $t('catalog.composition') }}</a>
                <a href="#" class="link">{{ $t('catalog.whatsapp') }}</a>
                <a href="#" class="link">{{ $t('catalog.call') }} 8 800 350-5670</a>
                <a href="#" class="link">{{ $t('common.share') }}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import global from "~/mixins/global";
import PropsView from "~/components/pages/catalog/catalogElement/PropsView";

export default {
  name: "MobileDragPanel",
  data(){
    return {
      translateTotal: 0,
      startX: 0,
      startY: 0,
      maxMoveY: 0,
      windowHeight: 0,
      startPos: 0,
      dragDirection: '',
      closeDragShow: false,
      selectWrapperHidden: false,
      selectHeadHidden: false,
      sizeWrapperHidden: false,
      sizeBtnShow: false,
      messageBtn: 'Select Size',
      selectHeadHeight: 0,
      sizeWrapHeight: 0,
      action: 'select',
    }
  },
  mixins:[global],
  components: {PropsView},
  props: ['product', 'images', 'color'],
  computed: {
    propsData(){
      return this.$store.getters["product/props"]
    },
    sectionData(){
      return this.$store.getters["product/section"]
    },
    colorID(){
      return this.$store.getters['product/colorSelect']
    },
    sizeID(){
      return this.$store.getters['product/sizeSelect']
    },
  },
  methods: {
    toggleDescription(event){
      event.preventDefault()
      let descriptionElement = this.$el.querySelector('.description')
      if(descriptionElement.classList.contains('text-showed')){
        descriptionElement.classList.remove('text-showed')
        event.target.classList.remove('active')
        event.target.text = this.$t('catalog.read')
      }
      else{
        descriptionElement.classList.add('text-showed')
        event.target.classList.add('active')
        event.target.text = this.$t('catalog.hide')
      }
    },
    initPanel(){
      let app = this;
      this.maxMoveY = window.innerHeight + 8
      //if(!$("#dragging-content .dragging-wrapper .select-wrapper .select-head").hasClass("multiple-select")) {
      if(!this.$el.querySelector('.dragging-wrapper .select-wrapper .select-head').classList.contains('multiple-select')) {
        this.translateTotal = -164;
      }
      else {
        this.translateTotal = -197;
      }

      if (window.matchMedia("(max-width: 767px)").matches) {
        let tweenMenuContainer = new gsap.core.Timeline({
          smoothChildTiming: true
        })
        Draggable.create(this.$el, {
          trigger: this.$el.querySelector(".dragging-field"),
          type: "y",
          bounds: {
            minY: app.translateTotal,
            maxY: -app.maxMoveY
          },
          onPress: function() {
            app.startX = this.x;
            app.startY = this.y;
          },
          onDrag: function() {
            let xChange = this.x - app.startX,
              yChange = this.y - app.startY,
              ratio = Math.abs(xChange / yChange),
              direction = [];
            if (ratio < 4) {
              direction.push((yChange < 0) ? "up" : "down");
            }
            app.dragDirection = getMomentaryDirection(this.target, xChange, yChange);
          },
          onDragEnd: function(e) {
            if (app.dragDirection === "up") {
              tweenMenuContainer.to(app.$el, 0.1, {
                y: -app.maxMoveY
              });
              app.closeDragShow = true
              app.selectWrapperHidden = true
              app.selectHeadHidden = false
              app.sizeWrapperHidden = true
              app.sizeBtnShow = false
            }
            if (app.dragDirection === "down") {
              tweenMenuContainer.to(app.$el, 0.1, {
                y: app.translateTotal
              });
              app.closeDragShow = false
              app.selectWrapperHidden = false
              app.selectHeadHidden = false
              app.sizeWrapperHidden = true
              app.sizeBtnShow = false

              app.$el.querySelector(".dragging-wrapper").scrollTop = 0;
            }
          }
        });
        function getMomentaryDirection(target, x, y) {
          //var x = ThrowPropsPlugin.getVelocity(target, "x"),
          //  y = ThrowPropsPlugin.getVelocity(target, "y"),
          let ratio = Math.abs(x / y),
              direction = [];
          if (ratio < 4) {
            direction.push((y < 0) ? "up" : "down");
          }
          return direction.join("-");
        }
      }
    },
    onFilterLink(){
      let tweenMenuContainer = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      if (this.$el.querySelector("input:checked")) {
        tweenMenuContainer.to(app.$el, 0.1, {
          y: this.translateTotal
        });
        this.closeDragShow = false
        this.selectWrapperHidden = false
        this.selectHeadHidden = false
        this.sizeWrapperHidden = true

        this.$el.querySelector(".dragging-wrapper").scrollTop = 0;
      }
    },
    onCloseDrag(){
      let tweenMenuContainer = new gsap.core.Timeline({
        smoothChildTiming: true
      })

      this.closeDragShow = false
      this.selectWrapperHidden = false
      this.selectHeadHidden = false
      this.sizeWrapperHidden = true

      tweenMenuContainer.to(this.$el, 0.1, {
        y: this.translateTotal
      });
      this.$el.querySelector(".dragging-wrapper").scrollTop = 0;
    },
    onSize(item){
      let tweenMenuContainer = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      this.sizeWrapperHidden = !this.sizeWrapperHidden

      this.selectHeadHidden = !this.selectHeadHidden
      this.sizeBtnShow = !this.sizeBtnShow;

      if(this.sizeBtnShow) {
        this.action = 'select'
        this.messageBtn = this.$t('common.select')
        tweenMenuContainer.to(this.$el, 0.1, {
          y: this.translateTotal -this.sizeWrapHeight + this.selectHeadHeight
        });
      }
      else {
        this.messageBtn = this.$t('catalog.add')
        this.action = 'add'
        tweenMenuContainer.to(this.$el, 0.1, {
          y: this.translateTotal
        });
      }
      this.$store.commit('product/SET_SELECT_SIZE', item.value)
    },
    sizeBtnAction(){
      switch (this.action){
        case 'select':
          this.onSizeShow()
          break;
        case 'add':
          this.onAddToBasket()
          break;
      }
    },
    onSizeShow(){
      let tweenMenuContainer = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      this.sizeWrapperHidden = !this.sizeWrapperHidden

      this.selectHeadHidden = !this.selectHeadHidden
      this.sizeBtnShow = !this.sizeBtnShow;

      if(this.sizeBtnShow) {
        this.action = 'select'
        this.messageBtn = this.$t('common.select')
        tweenMenuContainer.to(this.$el, 0.1, {
          y: this.translateTotal -this.sizeWrapHeight + this.selectHeadHeight
        });
      }
      else {
        this.messageBtn = this.$t('catalog.add')
        this.action = 'add'
        tweenMenuContainer.to(this.$el, 0.1, {
          y: this.translateTotal
        });
      }
    },
    async onAddToBasket(){
      this.cursorLoaderStart()
      if(this.sizeID){
        let size = {
          'NAME': this.propsData.sizes.name,
          'CODE': this.propsData.sizes.code,
          'VALUE': this.propsData.sizes.items[this.colorID][this.sizeID].name
        };
        let color = {
          'ID': this.propsData.colors.items[this.colorID].value,
          'NAME': this.propsData.colors.name,
          'CODE': this.propsData.colors.code,
          'VALUE': this.propsData.colors.items[this.colorID].name
        };
        let article = {
          'NAME': 'Артикул',
          'CODE': 'CML2_ARTICLE',
          'VALUE': this.product.article
        };
        await this.$api_not_loader.post('/api/add_basket.php', {
          action:'ADD2BASKET',
          id: this.product.id,
          site_id: 's1',
          prop: [
            size,
            color,
            article
          ]
        }).then(res => {
          if(res.data.success){
            this.$store.commit('basket/SET_CHANGED', true)
          }
        })
        this.cursorLoaderStop()
      }
      else {
        this.viewType('sizes')
      }
    },
  },
  mounted() {
    this.selectHeadHeight = this.$el.querySelector(".select-wrapper .select-head").clientHeight;
    this.sizeWrapHeight = this.$el.querySelector(".select-wrapper .size-wrapper").clientHeight;
    this.sizeWrapperHidden = true
    this.windowHeight = window.innerHeight
    this.initPanel()
    window.addEventListener('resize', this.initPanel, false);
  }
};
</script>
