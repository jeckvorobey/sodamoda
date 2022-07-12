<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="bs-title">Выберите размер</div>
        <div class="modal-size-items">
          <div class="size">
            <div class="item" v-for="size in sizes" :key="size.name">
              <a @click="selectSizeItem(size.value)">
                <span>{{ size.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "~/mixins/global";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

export default {
  name: "ViewSizes",
  mixins:[global],
  computed: {
    productData(){
      return this.$store.getters["product/product"]
    },
    propsData(){
      return this.$store.getters["product/props"]
    },
    sizes(){
      return this.propsData.sizes.items[this.$store.getters['product/colorSelect']]
    },
    colorID(){
      return this.$store.getters['product/colorSelect']
    },
    sizeID(){
      return this.$store.getters['product/sizeSelect']
    },
  },
  methods: {
    selectSizeItem(id){
      this.$store.commit('product/SET_SELECT_SIZE', id)
      this.addToBasket()
      this.hide()
    },
    hide(){
      document.getElementsByTagName('body')[0].classList.remove('modal-open')
      this.$store.commit('popup/SET_STATUS', false)
    },
    async addToBasket(){
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
          'VALUE': this.productData.article
        };
        await this.$api_not_loader.post('/api/add_basket.php', {
          action:'ADD2BASKET',
          id: this.productData.id,
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
    initDraggableModal() {
      let app = this
      let duration = 2000,
        windowHeight = window.innerHeight,
        window_width = window.innerWidth;

      let startPos = 0,
        targetElement = this.$el.querySelectorAll(".modal:not(.table-modal) .modal-body"),
        maxMoveY = windowHeight + 8,
        startX, startY,
        dragDirection;

      if (targetElement.length) {
        if (window.matchMedia("(min-width: 768px)").matches) {

          Draggable.create(targetElement, {
            trigger: targetElement,
            type: "y",
            bounds: {
              minY: -50,
              maxY: 50,
            },
            onPress: function() {
              startX = this.x;
              startY = this.y;
            },
            onDrag: function() {
              let xChange = this.x - startX,
                yChange = this.y - startY,
                ratio = Math.abs(xChange / yChange),
                direction = [];
              if (ratio < 4) {
                direction.push((yChange < 0) ? "up" : "down");
              }
              //dragDirection = getMomentaryDirection(this.target);
            },
            onDragEnd: function(e) {
              const tweenMenuContainer = new gsap.core.Timeline({
                smoothChildTiming: true
              })
              //app.hide();
              tweenMenuContainer.to(targetElement, 0, {
                y: 0
              });
            }
          });
          function getMomentaryDirection(target) {
            var x = ThrowPropsPlugin.getVelocity(target, "x"),
              y = ThrowPropsPlugin.getVelocity(target, "y"),
              ratio = Math.abs(x / y),
              direction = [];
            if (ratio < 4) {
              direction.push((y < 0) ? "up" : "down");
            }
            return direction.join("-");
          }
        }
      }
    }
  },
  mounted() {
    this.initDraggableModal()
  }
};
</script>
