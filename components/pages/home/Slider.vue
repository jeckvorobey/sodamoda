<template>
  <section class="introduction itcss">
    <div class="introduction-carousel itcss__wrapper">
      <div class="itcss__items">
        <div class="slide-item itcss__item" v-for="item in slides" :key="item.id">
          <img class="slide-background desktop-image" :src="item.thumb_pc" alt="hero-background">
          <img class="slide-background mobile-image" :src="item.thumb_mobile" alt="hero-background">
          <div class="section-container">
            <div class="info">
              <h2>
                <span class="split-text" v-html="splitTexts(item.name)"></span>
              </h2>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="scroll-bottom">{{ $t('home.ScrollToSee') }}</button>
  </section>
</template>

<script>
import gsap from "gsap";
import { Power3 } from "gsap";

export default {
  name: "Slider",
  data(){
    return {
      prefix: 'itcss',
      classNameItem: '__item',
      classNameItemActive: '__item_active',
      classNameItems: '__items',
      classNameIndicator: '__indicator',
      classNameIndicatorActive: '__indicator_active',
      classNameIndicators: '__indicators',
      classNameControl: '__control',
      classNameControlPrev: '__control_prev',
      classNameControlNext: '__control_next',
      classNameControlShow: '__control_show',
      selectorItems: '',
      selectorItem: '',
      selectorItemActive: '',
      selectorIndicatorActive: '',
      selectorIndicators: '',
      selectorWrapper: '__wrapper',
      selectorControl: '',
      selectorControlNext: '',
      selectorControlPrev: '',
      swipeThreshold: 20,
      transitionNone: 'transition-none',

      elWrapper: '',
      elItems: '',
      elItem: '',
      currentIndex: 0,
      minOrder: 0,
      maxOrder: 0,
      itemWithMinOrder: null,
      itemWithMaxOrder: null,
      minTranslate: 0,
      maxTranslate: 0,
      direction: 'next',
      balancingItemsFlag: false,
      transform: 0,
      width: 0,
      supportResizeObserver: true,
      hasSwipeState: false,
      hasSwiping: false,
      swipeStartPosX: 0,
      swipeStartPosY: 0,
      intervalId: null,
      defaultConfig: {
        autoplay: true,
        loop: true,
        indicators: false,
        interval: 2000,
        speed: 500,
        swipe: true,
        controls: true,
      },
      config: {},
    }
  },
  computed:{
    slides(){
      return this.$store.getters['slider/slides']
    }
  },
  methods: {
    prepare(){
      this.classNameItem = this.prefix + this.classNameItem
      this.classNameItemActive = this.prefix + this.classNameItemActive
      this.classNameItems = this.prefix + this.classNameItems
      this.classNameIndicator = this.prefix + this.classNameIndicator
      this.classNameIndicatorActive = this.prefix + this.classNameIndicatorActive
      this.classNameIndicators = this.prefix + this.classNameIndicators
      this.classNameControl = this.prefix + this.classNameControl
      this.classNameControlPrev = this.prefix + this.classNameControlPrev
      this.classNameControlNext = this.prefix + this.classNameControlNext
      this.classNameControlShow = this.prefix + this.classNameControlShow

      this.selectorWrapper = '.' + this.prefix + this.selectorWrapper

      this.selectorItems = '.' + this.classNameItems
      this.selectorItem = '.' + this.classNameItem
      this.selectorItemActive = '.' + this.classNameItemActive
      this.selectorIndicatorActive = '.' + this.classNameIndicatorActive
      this.selectorIndicators = '.' + this.classNameIndicators
      this.selectorControl = '.' + this.classNameControl
      this.selectorControlNext = '.' + this.classNameControlNext
      this.selectorControlPrev = '.' + this.classNameControlPrev
    },
    init(){
      this.elWrapper = this.$el.querySelector(this.selectorWrapper)
      this.elItems = this.$el.querySelector(this.selectorItems)
      this.elItem = this.$el.querySelectorAll(this.selectorItem)

      this.width = this.elWrapper.getBoundingClientRect().width
      this.supportResizeObserver = typeof window.ResizeObserver !== 'undefined'
      this.config = Object.assign(this.defaultConfig, this.config)

      this.elItems.dataset.translate = 0
      this.elItem.forEach((item, index) => {
        item.dataset.order = index
        item.dataset.index = index
        item.dataset.translate = 0
      })

      if(this.config.loop){
        let count = this.elItem.length - 1
        let translate = -this.elItem.length

        this.elItem[count].dataset.order = -1
        this.elItem[count].dataset.translate = translate

        let translateX = translate * this.width
        this.elItem[count].style.transform = "translateX(" + translateX + 'px)'
      }
      // добавляем индикаторы к слайдеру
      this.addIndicators()
      // обновляем экстремальные значения переменных
      this.refreshExtremeValues()
      // помечаем активные элементы
      this.setActiveClass()
      // назначаем обработчики
      this.addEventListener()
      this.autoplay()
    },
    // добавление индикаторов
    addIndicators(){
      if(this.$el.querySelector(this.selectorIndicators) || !this.config.indicators){
        return;
      }
      let html = '';
      for (let i = 0, length = this.elItem.length; i < length; i++){
        html += `<li class="${this.classNameIndicator}" data-slide-to="${i}"></li>`
      }
      this.$el.insertAdjacentHTML('beforeend', `<ol class="${this.classNameIndicators}">${html}</ol>`)
    },
    // refresh extreme values
    refreshExtremeValues(){
      this.minOrder = parseInt(this.elItem[0].dataset.order)
      this.maxOrder = this.minOrder
      this.itemWithMinOrder = this.elItem[0]
      this.itemWithMaxOrder = this.itemWithMinOrder
      this.minTranslate = parseInt(this.elItem[0].dataset.translate)
      this.maxTranslate = this.minTranslate

      for(let i = 0, length = this.elItem.length; i < length; i++){
        let item = this.elItem[i]
        let order = parseInt(item.dataset.order)

        if(order < this.minOrder){
          this.minOrder = order
          this.itemWithMinOrder = item
          this.minTranslate = parseInt(item.dataset.translate)
        }
        else if(order > this.maxOrder){
          this.maxOrder = order
          this.itemWithMaxOrder = item
          this.maxTranslate = parseInt(item.dataset.translate)
        }
      }
    },
    // помечаем активные элементы
    setActiveClass(){
      const elActive = this.$el.querySelector(this.selectorItemActive)
      elActive ? elActive.classList.remove(this.classNameItemActive) : null

      const elActiveNew = this.$el.querySelector(`[data-index="${this.currentIndex}"]`)
      elActiveNew ? elActiveNew.classList.add(this.classNameItemActive) : null

      const elIndicatorActive = this.$el.querySelector(this.classNameIndicatorActive)
      elIndicatorActive ? elIndicatorActive.classList.remove(this.classNameIndicatorActive) : null

      const elIndicatorNew = this.$el.querySelector(`[data-slide-to="${this.currentIndex}"]`)
      elIndicatorNew ? elIndicatorNew.classList.add(this.classNameIndicatorActive) : null

      if(this.controls){
        const elPrevBtn = this.$el.querySelector(this.classNameControlPrev)
        const elNextBtn = this.$el.querySelector(this.classNameControlNext)

        elPrevBtn ? elPrevBtn.classList.add(this.classNameControlShow) : null
        elNextBtn ? elPrevBtn.classList.add(this.classNameControlShow) : null

        if(!this.config.loop && this.currentIndex === 0){
          elPrevBtn.classList.remove(this.classNameControlShow)
        }
        else{
          elNextBtn.classList.remove(this.classNameControlShow)
        }
      }

      this.$el.dispatchEvent(new CustomEvent('active.itc.slider', {
        bubbles: true
      }))
    },
    // назначаем обработчики
    addEventListener(){
      let items = this.elItems

      this.$el.addEventListener('click', this.onClick)

      if(this.config.loop){
        items.addEventListener('transition-start', this.onTransitionStart)
        items.addEventListener('transitionend', this.onTransitionEnd)
      }
      if(this.config.autoplay){
        this.$el.addEventListener('mouseenter', this.onMouseEnter)
        this.$el.addEventListener('mouseleave', this.onMouseLeave)
      }
      if(this.config.swipe){
        let supportsPassive = false

        try{
          let opts = Object.defineProperty({}, 'passive', {
            get: function (){
              supportsPassive = true
            }
          })
          window.addEventListener('testPassiveListener', null, opts)
        }
        catch(err){}

        this.$el.addEventListener('touchstart', this.onSwipeStart, supportsPassive ? { passive: false } : false)
        this.$el.addEventListener('touchmove', this.onSwipeMove, supportsPassive ? { passive: false } : false)
        this.$el.addEventListener('mousedown', this.onSwipeStart)
        this.$el.addEventListener('mousemove', this.onSwipeMove)
        this.$el.addEventListener('touchend', this.onSwipeEnd)
        this.$el.addEventListener('mouseup', this.onSwipeEnd)
        this.$el.addEventListener('mouseout', this.onSwipeEnd)
      }

      this.$el.addEventListener('dragstart', this.onDragStart)
      document.addEventListener('visibilitychange', this.onVisibilityChange)

      if(this.supportResizeObserver){
        let resizeObserver = new ResizeObserver(this.onResizeObserver)
        resizeObserver.observe(this.elWrapper)
        return;
      }
    },
    autoplay(action){
      if(!this.config.autoplay){
        return
      }
      if(action === 'stop'){
        clearInterval(this.intervalId)
        this.intervalId = null
        return
      }
      if(this.intervalId === null){
        this.makeAutoplay()
      }
    },
    move(useTransition){
      let translateX
      this.elItems.classList.remove(this.transitionNone)

      if(useTransition === false){
        this.elItems.classList.add(this.transitionNone)
      }
      if(this.direction === 'none'){
        translateX = this.transform * this.width
        this.elItems.style.transform = 'translateX(' + translateX + 'px)'
        return;
      }
      if(!this.config.loop){
        let condition = this.currentIndex + 1 >= this.elItem.length
        if(condition && this.direction === 'next'){
          this.autoplay('stop')
          return;
        }
        if(this.currentIndex <= 0 && this.direction === 'prev'){
          return;
        }
      }

      let step = this.direction === 'next' ? -1 : 1
      let transform = this.transform + step

      if(this.direction === 'next'){
        if(++this.currentIndex > this.elItem.length - 1){
          this.currentIndex -= this.elItem.length
        }
      }
      else{
        if(--this.currentIndex < 0){
          this.currentIndex += this.elItem.length
        }
      }

      this.transform = transform
      this.elItems.dataset.translate = transform
      translateX = transform * this.width
      this.elItems.style.transform = 'translateX(' + translateX + 'px)';
      this.elItems.dispatchEvent(new CustomEvent('transition-start', {
        bubbles: true
      }))
      this.setActiveClass()
      this.animateLetters(this.$el.querySelector(this.selectorItemActive))
    },
    moveTo(index, useTransition){
      let currentIndex = this.currentIndex
      this.direction = index > currentIndex ? 'next' : 'prev'
      for(let i = 0; i < Math.abs(index - currentIndex); i++){
        this.move(useTransition)
      }
    },
    balancingItems(){
      if(!this.balancingItemsFlag){
        return
      }
      let wrapper = this.elWrapper
      let wrapperRect = wrapper.getBoundingClientRect()
      let halfWidthItem = wrapperRect.width / 2
      let count = this.elItem.length
      let translate
      let clientRect
      let translateX

      if(this.direction === 'next'){
        let wrapperLeft = wrapperRect.left
        let min = this.itemWithMinOrder
        translate = this.minTranslate
        clientRect = min.getBoundingClientRect()

        if(clientRect.right < wrapperLeft - halfWidthItem){
          min.dataset.order = this.minOrder + count
          translate += count
          min.dataset.translate = translate
          translateX = translate * this.width
          min.style.transform = 'translateX(' + translateX + 'px)';
          this.refreshExtremeValues()
        }
      }
      else if(this.direction === 'prev'){
        let wrapperRight = wrapperRect.right
        let max = this.itemWithMaxOrder
        translate = this.maxTranslate
        clientRect = max.getBoundingClientRect()

        if(clientRect.left > wrapperRight + halfWidthItem){
          max.dataset.order = this.maxOrder - count
          translate -= count
          max.dataset.translate = translate
          translateX = translate * this.width
          max.style.transform = 'translateX(' + translateX + 'px)';
          this.refreshExtremeValues()
        }
      }

      requestAnimationFrame(this.balancingItems)
    },
    next(){
      this.direction = 'next'
      this.move()
    },
    prev(){
      this.direction = 'prev'
      this.move()
    },
    splitTexts(text) {
      let string = '';
      for (let i = 0; i <= text.length; i++) {
        let letter = text.charAt(i);
        if (letter === ' ') {
          letter = '&nbsp';
        }
        string += `<span class='letter'>${letter}</span>`;
      }
      return string
    },
    animateLetters(elem){
      let currentText1 = elem.querySelector('.split-text')
      const textTimeline0 = new gsap.core.Timeline()
      const textTimeline1 = new gsap.core.Timeline()
      let shift1 = 500
      let shift2 = 500
      let easing = 'power1.easeOut'

      if(currentText1){
        textTimeline0.fromTo(
          currentText1.parentElement,0.8,{
            x: shift1,
          },{
            x: 0,
            ease: easing,
          },0.2);

        textTimeline1.staggerFromTo(
          currentText1.querySelectorAll('.letter'),0.3,{
            x: shift2,
          },{
            x: 0,
            ease: easing,
          }, 0.03,0.2 );

        textTimeline1.staggerFromTo(
          currentText1.querySelectorAll('.letter'),0.3,{
            opacity: 0,
          },{
            opacity: 1,
            ease: 'power3.inOut',
          }, 0.03,0.2);
      }
    },
    makeAutoplay(){
      let appObj = this
      clearInterval(this.intervalId)
      this.intervalId = setInterval(function(){
        appObj.direction = 'next'
        appObj.move()
      }, this.config.interval)
    },
    //events
    onClick(e){
      let target = e.target
      this.autoplay('stop')

      if(target.classList.contains(this.classNameControl)){
        e.preventDefault()
        this.direction = target.dataset.slide
        this.move()
      }
      else if(target.dataset.slideTo){
        e.preventDefault()
        let index = parseInt(target.dataset.slideTo)
        this.moveTo(index)
      }

      if(this.config.loop){
        this.autoplay()
      }
    },
    onTransitionStart(){
      if(!this.balancingItemsFlag){
        this.balancingItemsFlag = true
        window.requestAnimationFrame(this.balancingItems)
      }
    },
    onTransitionEnd(){
      this.balancingItemsFlag = false
      this.makeAutoplay()
      this.$el.dispatchEvent(new CustomEvent('transition-end', {
        bubbles: true
      }))
    },
    onMouseEnter(){
      this.autoplay('stop')
    },
    onMouseLeave(){
      if(this.config.loop){
        this.autoplay()
      }
    },
    onSwipeStart(e){
      this.autoplay('stop')
      if(e.target.closest(this.classNameControl)){
        return;
      }

      let event = e.type.search('touch') === 0 ? e.touches[0] : e
      this.swipeStartPosX = event.clientX
      this.swipeStartPosY = event.clientY
      this.hasSwipeState = true
      this.hasSwiping = false
    },
    onSwipeMove(e){
      if(!this.hasSwipeState){
        return;
      }

      let event = e.type.search('touch') === 0 ? e.touches[0] : e
      let diffPosX = this.swipeStartPosX - event.clientX
      let diffPosY = this.swipeStartPosY - event.clientY

      if(!this.hasSwiping){
        if(Math.abs(diffPosY) > Math.abs(diffPosX) || Math.abs(diffPosX) === 0){
          this.hasSwipeState = false
          return;
        }
        this.hasSwiping = true
      }

      e.preventDefault()
      if(!this.config.loop){
        if(this.currentIndex + 1 >= this.elItem.length && diffPosX >= 0){
          diffPosX = diffPosX / 4
        }
        if(this.currentIndex <= 0 && diffPosX <= 0){
          diffPosX = diffPosX / 4
        }
      }

      let value = (diffPosX / this.elWrapper.getBoundingClientRect().width)
      let translateX = this.transform - value

      this.elItems.classList.add(this.transitionNone)
      translateX = translateX * this.width
      this.elItems.style.transform = 'translateX(' + translateX + 'px)'
    },
    onSwipeEnd(e){
      if(!this.hasSwipeState){
        return;
      }

      let event = e.type.search('touch') === 0 ? e.changedTouches[0] : e
      let diffPosX = this.swipeStartPosX - event.clientX

      if(diffPosX === 0){
        this.hasSwipeState = false
      }
      if(!this.config.loop){
        if(this.currentIndex + 1 >= this.elItem.length && diffPosX >= 0){
          diffPosX = diffPosX / 7
        }
        if(this.currentIndex <= 0 && diffPosX <= 0){
          diffPosX = diffPosX / 7
        }
      }

      let value = (diffPosX / this.elWrapper.getBoundingClientRect().width) * 100
      this.elItems.classList.remove(this.transitionNone)

      if(value > this.swipeThreshold){
        this.direction = 'next'
        this.move()
      }
      else if(value < -this.swipeThreshold){
        this.direction = 'prev'
        this.move()
      }
      else{
        this.direction = 'none'
        this.move()
      }
      this.hasSwipeState = false
      if(this.config.loop){
        this.autoplay()
      }
    },
    onDragStart(e){
      e.preventDefault()
    },
    onVisibilityChange(){
      if(document.visibilityState === 'hidden'){
        this.autoplay('stop')
      }
      else if(document.visibilityState === 'visible'){
        if(this.config.loop){
          this.autoplay()
        }
      }
    },
    onResizeObserver(entries){
      let contentBoxSize = entries[0].contentBoxSize
      let contentRect = entries[0].contentRect
      let newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize
      let newTranslateX

      if(this.width.toFixed(1) === newWidth.toFixed(1)){
        return
      }

      this.autoplay('stop')
      this.elItems.classList.add(this.transitionNone)
      this.width = parseInt(newWidth.toFixed(1), 10)

      newTranslateX = newWidth * parseInt(this.elItems.dataset.translate, 10)

      let items = this.elItems
      for(let i = 0; i < items.length; i++){
        let translateX = parseInt(items[i].dataset.translate)
        newTranslateX = translateX * newWidth
        items[i].style.transform = 'translateX(' + newTranslateX + 'px)'
      }

      if(this.config.loop){
        this.autoplay()
      }
    },
  },
  created() {
    this.prepare()
  },
  mounted() {
    document.addEventListener('DOMContentLoaded', this.init);
  },
  async fetch() {
    await this.$store.dispatch('slider/fetch')
  },
};
</script>

<style scoped>
/* стили для корневого элемента слайдера */
.itcss {
  position: relative;
  overflow: hidden;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* стили для wrapper */
.itcss__wrapper {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}

/* стили для элемента, в котором непосредственно расположены элементы (слайды) */
.itcss__items {
  display: flex;
  transition: transform 1s cubic-bezier( 0.23, 1, 0.32, 1 );

}

/* класс для отключения transition */
.transition-none {
  transition: none;
}

/* стили для элементов */
.itcss__item {
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
}
.itcss__item.itcss__item_active .info p{
  opacity: 1!important;
}
/* кнопки Prev и Next */
.itcss__control {
  position: absolute;
  top: 50%;
  width: 40px;
  height: 50px;
  transform: translateY(-50%);
  display: none;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0.5;
  user-select: none;
}

.itcss__control_show {
  display: flex;
}

.itcss__control:hover,
.itcss__control:focus {
  color: #fff;
  text-decoration: none;
  opacity: 0.7;
}

.itcss__control_prev {
  left: 0;
}

.itcss__control_next {
  right: 0;
}

.itcss__control::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background: transparent no-repeat center center;
  background-size: 100% 100%;
}

.itcss__control_prev::before {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}

.itcss__control_next::before {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
}

/* Индикаторы */
.itcss__indicators {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  display: flex;
  justify-content: center;
  padding-left: 0;
  margin: 0 15%;
  list-style: none;
  user-select: none;
}

.itcss__indicator {
  flex: 0 1 auto;
  width: 30px;
  height: 4px;
  margin-right: 3px;
  margin-left: 3px;
  background-color: rgba(255, 255, 255, 0.5);
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  cursor: pointer;
}

.itcss__indicator_active {
  background-color: #fff;
}
</style>
