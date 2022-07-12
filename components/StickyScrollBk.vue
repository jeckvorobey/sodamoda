<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "StickyScroll",
  data(){
    return {
      lastScroll: 0,
      scrollBlock: 0,
      stickyOpts: {
        startSticky: 0,
        endSticky: 0,
        container: '',
        sidebar: '',
      },
      minOffsetPref: 100,
    }
  },
  props: ['stickyOptions'],
  methods: {
    //scroll func
    stickyScroll(){
      let scrollPos = window.pageYOffset || document.documentElement.scrollTop;

      this.scrollTopFixed(scrollPos)
      if(scrollPos >= this.stickyOpts.startSticky){
        if(this.lastScroll > scrollPos){
          //console.log('up')
          this.scrollUp(scrollPos)
        }
        else{
          //console.log('down')
          this.scrollDown(scrollPos)
        }
      }
      this.lastScroll = scrollPos <= 0 ? 0 : scrollPos
    },
    scrollUp(scrollPos){
      this.scrollFixedUpBlock(scrollPos)
      this.scrollBottomFixed(scrollPos)
    },
    scrollDown(scrollPos){
      this.scrollFixedDownBlock(scrollPos)
      this.scrollBottomFixed(scrollPos)
    },
    scrollFixedUpBlock(scrollPos){
      if(this.scrollBlock > -this.stickyOptions.scrollTop){
        if((this.stickyOpts.container.getBoundingClientRect().bottom + this.stickyOptions.scrollBottom) - window.innerHeight > 0){
          this.scrollBlock = this.scrollBlock - (this.lastScroll - scrollPos)
        }
      }

      this.$el.style.top = -this.scrollBlock + 'px'
    },
    scrollFixedDownBlock(scrollPos){
      if(scrollPos >= this.stickyOpts.startSticky){
        if(this.scrollBlock < this.stickyOpts.endSticky + this.stickyOptions.scrollBottom){
          if(this.smallHeight()){
            this.scrollBlock = 0
          }
          else{
            this.scrollBlock = this.scrollBlock - (this.lastScroll - scrollPos)
          }
        }
        else if(this.scrollBlock >= this.stickyOpts.endSticky + this.stickyOptions.scrollBottom){
          if(this.smallHeight()){
            this.scrollBlock = 0
          }
          else{
            this.scrollBlock = this.stickyOpts.endSticky + this.stickyOptions.scrollBottom
          }
        }
      }

      this.$el.style.top = -this.scrollBlock + 'px'
    },
    //Toggle fixed position on top
    scrollTopFixed(scrollPos){
      if(scrollPos >= this.stickyOpts.startSticky){
        this.$el.style.position = 'fixed'
      }
      else if(scrollPos < (this.stickyOpts.startSticky - this.stickyOptions.scrollTop)){
        this.$el.style.top = 0 + 'px'
        this.$el.style.position = 'absolute'
        this.scrollBlock = 0
      }
    },
    //Toggle fixed position on bottom
    scrollBottomFixed(scrollPos){
      //let scrollSidebarEnd = (containerHeight) - containerSidebarHeight
      if(!this.smallHeight()){
        if((this.stickyOpts.container.getBoundingClientRect().bottom + this.stickyOptions.scrollBottom) - window.innerHeight < 0){
          this.$el.style.top = this.stickyOpts.container.getBoundingClientRect().height - this.stickyOpts.sidebar.getBoundingClientRect().height + 'px'
          this.$el.style.position = 'absolute'
        }
        else if((this.stickyOpts.container.getBoundingClientRect().bottom + this.stickyOptions.scrollBottom) - window.innerHeight < 0){
          if(this.scrollBlock > 0){
            this.$el.style.position = 'fixed'
          }
        }
      }
    },
    smallHeight(){
      return this.stickyOpts.sidebar.getBoundingClientRect().height < (window.innerHeight - this.minOffsetPref)
    }
  },
  mounted() {
    this.stickyOpts.container = document.querySelector(this.stickyOptions.containerSelector)
    this.stickyOpts.sidebar = this.$el.querySelector(this.stickyOptions.sidebarSelector)

    this.stickyOpts.startSticky = this.stickyOpts.container.offsetTop
    if(this.smallHeight()){
      this.stickyOpts.endSticky = 0
    }
    else{
      this.stickyOpts.endSticky = this.stickyOpts.sidebar.getBoundingClientRect().height - window.innerHeight
    }

    window.addEventListener('touchmove', this.stickyScroll, false);
    window.addEventListener('scroll', this.stickyScroll, false);
    window.addEventListener('resize', this.stickyScroll, false);
    document.body.addEventListener('touchmove', this.stickyScroll, false);
    document.body.addEventListener('scroll', this.stickyScroll, false);
    document.body.addEventListener('resize', this.stickyScroll, false);
  }
};
</script>
