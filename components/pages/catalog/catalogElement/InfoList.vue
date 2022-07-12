<template>
  <StickyScrollElement class="info" :sticky-options="stickyOpts" :key="$i18n.locale !== 'ru' ? productData.name_en : productData.name">
    <div class="section-container">
      <div class="info-wrapper">
        <nuxt-link :to="'/catalog/' + sectionData.code + '/'" class="category-link">{{ $i18n.locale !== 'ru' ? sectionData.name_en : sectionData.name }}</nuxt-link>
        <div class="info-element">
          <div class="info-item">
            <p>{{ $t('catalog.article') }}: {{ productData.article }}</p>
          </div>
          <div class="info-item">
            <div class="item">
              <a href="#" class="share-btn">
                <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7.99997H11V8.99997H15V21H1V8.99997H5V7.99997H0V22H16V7.99997ZM7.5 16H8.5V2.70697L11.5 5.70697L12.207 4.99997L8 0.792969L3.793 4.99997L4.5 5.70697L7.5 2.70697V16Z" fill="black"/>
                </svg>
                {{ $t('common.share') }}
              </a>
              <a href="#">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6685 4C19.6606 4 21 6.4136 21 8.8055C21 12.6765 15.8225 18.0494 12 20.7833C8.1775 18.0494 3 12.6765 3 8.8055C3 6.4136 4.3394 4 7.3316 4C8.11275 4.04485 8.87178 4.27616 9.54518 4.67458C10.2186 5.07299 10.7867 5.62692 11.2021 6.29L12 7.3466L12.7979 6.29C13.2133 5.62692 13.7815 5.07298 14.4549 4.67456C15.1283 4.27615 15.8873 4.04484 16.6685 4ZM16.6685 3C15.7327 3.04457 14.8211 3.31163 14.0092 3.77903C13.1972 4.24642 12.5085 4.90067 12 5.6875C11.4915 4.90068 10.8028 4.24644 9.99089 3.77905C9.17899 3.31166 8.26736 3.04459 7.3316 3C3.9564 3 2 5.5992 2 8.8055C2 13.5555 8.4583 19.6251 12 22C15.5417 19.6251 22 13.5555 22 8.8055C22 5.5992 20.0436 3 16.6685 3Z" fill="black"></path>
                  <path class="hover-background" d="M13.5503 4.76275L12.0347 6.43804L10.7785 5.10096L9.6831 3.87672L7.49235 3.52246L4.38248 4.24734L3.2236 5.63267L2.41797 7.5818L2.67557 9.98196L4.38248 13.6869L7.21781 17.408L12.0345 21.3868L15.82 18.4067L20.0887 13.2359L21.2002 11.1901L21.5224 8.41944L21.1035 6.66361L19.831 4.98833L18.3651 3.65125H15.7072L13.5503 4.76275Z" fill="black"></path>
                </svg>
                {{ $t('catalog.favorites') }}
              </a>
            </div>
          </div>
          <div class="info-item">
            <p class="bold">{{ $i18n.locale !== 'ru' ? productData.name_en : productData.name }}</p>
          </div>
          <div class="info-item">
            <p class="bold">{{ $i18n.locale !== 'ru' ? productData.price_en : productData.price }}</p>
          </div>
        </div>
        <p class="description" v-html="$i18n.locale !== 'ru' ? productData.description_en : productData.description"></p>
        <a href="javascript:void(0)" class="item-with-underline read-more" @click="toggleDescription" v-if="$i18n.locale !== 'ru' ? !!productData.description_en : !!productData.description">{{ $t('catalog.read') }}</a>
        <PropsView v-for="(prop, id) in propsData" :property="prop" :key="id"/>
        <a href="javascript:void(0)" class="btn" @click="addToBasket">{{ $t('catalog.add') }}</a>
        <div class="links-wrapper">
          <a href="#" class="link">{{ $t('catalog.stylist') }}</a>
          <a href="#" class="link">{{ $t('catalog.composition') }}</a>
          <a href="#" class="link">{{ $t('catalog.whatsapp') }}</a>
          <a href="#" class="link">{{ $t('catalog.call') }} 8 800 350-5670</a>
          <a href="#" class="link">{{ $t('common.share') }}</a>
        </div>
      </div>
    </div>
  </StickyScrollElement>
</template>

<script>
import PropsView from "~/components/pages/catalog/catalogElement/PropsView"
import StickyScrollElement from "~/components/StickyScroll";
import global from "~/mixins/global";

export default {
  name: "InfoList",
  mixins:[global],
  components: {StickyScrollElement, PropsView},
  data(){
    return {
      stickyOpts: {
        scrollTop: 0,
        scrollBottom: 0,
        containerSelector: '.product-wrapper',
        sidebarSelector: '.section-container',
      }
    }
  },
  computed: {
    productData(){
      return this.$store.getters["product/product"]
    },
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
  },
};

</script>
