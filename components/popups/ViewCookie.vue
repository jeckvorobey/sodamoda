<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="head-info cookie">
          <div>
            <BirthdayIcon />
            <span>Cookies Policy</span>
          </div>
        </div>
        <form class="main-form cookie">
          <label class="form-element">
            <p>We use our own cookies, as well as those of third parties, for individual as well as repeated sessions, in order to make the navigation of our website easy and safe for our users.</p>
          </label>
          <label class="form-element">
            <p>In turn, we use cookies to measure and obtain statistical data about the navigation of the users. You can configure and accept the use of the cookies, and modify your consent options, at any time. You can read more information about our Cookie Policy.</p>
          </label>
          <div class="action">
            <button class="btn">Accept Cookies</button>
            <button class="btn white">Reject Cookies</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ClosePopupIcon from "~/components/icon/ClosePopupIcon";
import BirthdayIcon from "~/components/icon/BirthdayIcon";
import global from "~/mixins/global";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
export default {
  name: "ViewCookie",
  components: {ClosePopupIcon, BirthdayIcon},
  methods: {
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
