<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="table-sizes">
          <div class="block-tables">
            <div class="bs-title">Одежда</div>
            <div class="footnote">* Размеры, указанные в справочнике размеров, относятся к размерам фигуры, а не одежды.</div>
            <div class="resp-table-wrap">
              <table>
                <tbody>
                <tr class="header">
                  <td>Размер</td>
                  <td>XXS</td>
                  <td>XS</td>
                  <td>S</td>
                  <td>M</td>
                  <td>L</td>
                  <!-- td>XL</td>
                  <td>XXL</td -->
                </tr>
                <tr class="header">
                  <td>Российский размер</td>
                  <td>38/40</td>
                  <td>40/42</td>
                  <td>42/44</td>
                  <td>44/46</td>
                  <td>46/48</td>
                  <!-- td>48/50</td>
                  <td>50/52</td -->
                </tr>
                <tr class="odd">
                  <td>Грудь (см)</td>
                  <td>80</td>
                  <td>85</td>
                  <td>90</td>
                  <td>92</td>
                  <td>98</td>
                  <!-- td>102</td>
                  <td>108</td -->
                </tr>
                <tr class="even">
                  <td>Талия (см)</td>
                  <td>56</td>
                  <td>60</td>
                  <td>64</td>
                  <td>72</td>
                  <td>80</td>
                  <!-- td>82</td>
                  <td>88</td -->
                </tr>
                <tr class="odd">
                  <td>Бедра (см)</td>
                  <td>85</td>
                  <td>87</td>
                  <td>92</td>
                  <td>97</td>
                  <td>105</td>
                  <!-- td>110</td>
                  <td>116</td -->
                </tr>
                </tbody>
              </table>
            </div>

            <div class="bs-title">ГОЛОВНЫЕ УБОРЫ</div>
            <table class="equal">
              <tbody>
              <tr class="header">
                <td>Размер</td>
                <td>S</td>
                <td>M</td>
              </tr>
              <tr class="odd">
                <td>Окружность головы (см)</td>
                <td>57</td>
                <td>58</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="block-image">
            <div class="bs-title">Как измерить</div>
            <div class="look-wrap">
              <img class="look" src="~assets/images/look-png.png" alt="">
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
  name: "ViewTable",
  mixins: [global],
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
