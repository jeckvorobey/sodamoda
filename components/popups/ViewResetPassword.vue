<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="head-info single">
          <div><span>Come up with a new password</span></div>
        </div>
        <form class="main-form single">
          <label class="form-element">
            <div class="field-name">new password</div>
            <input class="form-field" type="password" name="Password">
            <div class="show-password">
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.621094C9.55805 0.622284 7.16659 1.3162 5.10332 2.62225C3.04005 3.92831 1.38963 5.79291 0.34375 7.99951C1.38867 10.2068 3.03887 12.072 5.10235 13.3782C7.16584 14.6844 9.5578 15.3779 12 15.3779C14.4421 15.3779 16.8341 14.6844 18.8975 13.3782C20.961 12.072 22.6112 10.2068 23.6562 7.99951C22.6103 5.79291 20.9599 3.92831 18.8966 2.62225C16.8333 1.3162 14.4419 0.622284 12 0.621094ZM12 14.3778C9.8305 14.3686 7.70427 13.7704 5.8483 12.6471C3.99233 11.5237 2.47632 9.91731 1.46215 7.99951C2.46911 6.07571 3.98347 4.46433 5.84106 3.33997C7.69865 2.21562 9.82859 1.62122 12 1.62122C14.1713 1.62122 16.3012 2.21562 18.1588 3.33997C20.0164 4.46433 21.5308 6.07571 22.5378 7.99951C21.5236 9.91731 20.0076 11.5237 18.1516 12.6471C16.2956 13.7704 14.1694 14.3686 12 14.3778ZM12 4.33529C11.2752 4.33529 10.5668 4.55019 9.96423 4.95282C9.36166 5.35545 8.892 5.92772 8.61467 6.59731C8.33734 7.26681 8.26477 8.00351 8.40616 8.71431C8.54754 9.42511 8.89652 10.078 9.40897 10.5905C9.92142 11.1029 10.5743 11.4519 11.2851 11.5933C11.9959 11.7347 12.7326 11.6621 13.4022 11.3848C14.0717 11.1074 14.644 10.6378 15.0466 10.0352C15.4492 9.43261 15.6642 8.72421 15.6642 7.99951C15.6642 7.02771 15.2781 6.09571 14.5909 5.40851C13.9038 4.72134 12.9718 4.33529 12 4.33529ZM12 10.6637C11.473 10.6637 10.9579 10.5074 10.5198 10.2147C10.0817 9.92191 9.7402 9.50581 9.53855 9.01901C9.3369 8.53221 9.28414 7.99651 9.38694 7.47971C9.48974 6.96291 9.74348 6.48821 10.1161 6.11561C10.4887 5.74302 10.9634 5.48928 11.4802 5.38648C11.997 5.28368 12.5327 5.33645 13.0195 5.53809C13.5063 5.73974 13.9224 6.08121 14.2152 6.51931C14.5079 6.95751 14.6642 7.47261 14.6642 7.99951C14.6633 8.70581 14.3824 9.38301 13.8829 9.88241C13.3835 10.3819 12.7063 10.6629 12 10.6637Z" fill="black"/>
              </svg>
            </div>
          </label>
          <label class="form-element">
            <div class="field-name">repeat password</div>
            <input class="form-field" type="password" name="RepeatPassword">
            <div class="show-password">
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.621094C9.55805 0.622284 7.16659 1.3162 5.10332 2.62225C3.04005 3.92831 1.38963 5.79291 0.34375 7.99951C1.38867 10.2068 3.03887 12.072 5.10235 13.3782C7.16584 14.6844 9.5578 15.3779 12 15.3779C14.4421 15.3779 16.8341 14.6844 18.8975 13.3782C20.961 12.072 22.6112 10.2068 23.6562 7.99951C22.6103 5.79291 20.9599 3.92831 18.8966 2.62225C16.8333 1.3162 14.4419 0.622284 12 0.621094ZM12 14.3778C9.8305 14.3686 7.70427 13.7704 5.8483 12.6471C3.99233 11.5237 2.47632 9.91731 1.46215 7.99951C2.46911 6.07571 3.98347 4.46433 5.84106 3.33997C7.69865 2.21562 9.82859 1.62122 12 1.62122C14.1713 1.62122 16.3012 2.21562 18.1588 3.33997C20.0164 4.46433 21.5308 6.07571 22.5378 7.99951C21.5236 9.91731 20.0076 11.5237 18.1516 12.6471C16.2956 13.7704 14.1694 14.3686 12 14.3778ZM12 4.33529C11.2752 4.33529 10.5668 4.55019 9.96423 4.95282C9.36166 5.35545 8.892 5.92772 8.61467 6.59731C8.33734 7.26681 8.26477 8.00351 8.40616 8.71431C8.54754 9.42511 8.89652 10.078 9.40897 10.5905C9.92142 11.1029 10.5743 11.4519 11.2851 11.5933C11.9959 11.7347 12.7326 11.6621 13.4022 11.3848C14.0717 11.1074 14.644 10.6378 15.0466 10.0352C15.4492 9.43261 15.6642 8.72421 15.6642 7.99951C15.6642 7.02771 15.2781 6.09571 14.5909 5.40851C13.9038 4.72134 12.9718 4.33529 12 4.33529ZM12 10.6637C11.473 10.6637 10.9579 10.5074 10.5198 10.2147C10.0817 9.92191 9.7402 9.50581 9.53855 9.01901C9.3369 8.53221 9.28414 7.99651 9.38694 7.47971C9.48974 6.96291 9.74348 6.48821 10.1161 6.11561C10.4887 5.74302 10.9634 5.48928 11.4802 5.38648C11.997 5.28368 12.5327 5.33645 13.0195 5.53809C13.5063 5.73974 13.9224 6.08121 14.2152 6.51931C14.5079 6.95751 14.6642 7.47261 14.6642 7.99951C14.6633 8.70581 14.3824 9.38301 13.8829 9.88241C13.3835 10.3819 12.7063 10.6629 12 10.6637Z" fill="black"/>
              </svg>
            </div>
          </label>
          <button class="btn">Create new password</button>
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
  name: "ViewResetPassword",
  mixins: [global],
  components: {ClosePopupIcon},
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
