<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="head-info">
          <a href="#" class="register"><span>Log in to continue</span></a>
          <a href="#" class="login" @click="showPopup">Have an account? <span>Login</span></a>
        </div>
        <form class="main-form">
          <label class="form-element">
            <div class="field-name">phone</div>
            <input class="form-field" type="tel" name="phone">
          </label>
          <label class="form-element">
            <div class="field-name">e-mail</div>
            <input class="form-field" type="email" name="e-mail">
          </label>
          <button class="btn">Restore password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ClosePopupIcon from "~/components/icon/ClosePopupIcon";
import global from "~/mixins/global";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
export default {
  name: "ViewRecovery",
  mixins: [global],
  components: {ClosePopupIcon},
  methods: {
    showPopup(){
      this.viewType('auth')
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
