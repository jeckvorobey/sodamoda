import {gsap} from "gsap";

export default {
  methods:{
    show(){
      document.getElementsByTagName('body')[0].classList.add('modal-open')
      this.$store.commit('popup/SET_STATUS', true)
    },
    hide(){
      document.getElementsByTagName('body')[0].classList.remove('modal-open')
      this.$store.commit('popup/SET_STATUS', false)
    },
    viewType(type, message = ''){
      switch (type){
        case 'table':
          this.$store.commit('popup/SET_VIEW', 'Table')
          break;
        case 'sizes':
          this.$store.commit('popup/SET_VIEW', 'Sizes')
          break;
        case 'message':
          this.$store.commit('popup/SET_VIEW', 'Message')
          this.$store.commit('popup/SET_MESSAGE', message)
          break;
        case 'auth':
          this.$store.commit('popup/SET_VIEW', 'Auth')
          break;
        case 'recovery':
          this.$store.commit('popup/SET_VIEW', 'Recovery')
          break;
        case 'recovery-code':
          this.$store.commit('popup/SET_VIEW', 'RecoveryCode')
          break;
        case 'reset':
          this.$store.commit('popup/SET_VIEW', 'ResetPassword')
          break;
        case 'cookie':
          this.$store.commit('popup/SET_VIEW', 'Cookie')
          break;
        case 'registration':
          this.$store.commit('popup/SET_VIEW', 'Registration')
          break;
        case 'feedback':
          this.$store.commit('popup/SET_VIEW', 'Feedback')
          break;
      }
      this.show()
    },
    pluralize(count, one, two, more) {
      return count % 100 < 5 || count % 100 > 20 ? count % 10 == 1 ? one : count % 10 > 1 && count % 10 < 5 ? two : more : more
    },
    showLoader(){
      //this.$store.commit('loading/SET_VIEW', true)
    },
    hideLoader(time = 500){
      if(process.client){
        let appObj = this
        setTimeout(() => {appObj.$store.commit('loading/SET_VIEW', false)}, time)
      }
    },
    cursorLoaderStart(){
      if(!document.getElementsByTagName('body')[0].classList.contains('load')){
        document.getElementsByTagName('body')[0].classList.add('load')
      }
    },
    cursorLoaderStop(){
      if(document.getElementsByTagName('body')[0].classList.contains('load')){
        document.getElementsByTagName('body')[0].classList.remove('load')
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
  }
}
