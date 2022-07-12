<template>
  <section class="catalog-section">
    <div class="section-container" id="sectionContainer">
      <p>{{ $t('catalog.mostPopularProducts') }}</p>
      <CatalogFilterPanel />
      <CatalogFilterView />
      <h2>{{ $i18n.locale !== 'ru' ? section.name_en : section.name }}</h2>
      <div class="view-detail on-mobile">
        <a href="#" class="item-with-underline mobile-btn">{{ $t('catalog.detail') }}</a>
      </div>
      <div class="catalog-wrapper" :class="'type-' + view">
        <transition-group name="page">
          <component :is="component" :item="product" v-for="product in products" :key="product.id"></component>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script>
import CatalogFilterPanel from "~/components/pages/catalog/CatalogFilterPanel";
import CatalogFilterView from "~/components/pages/catalog/CatalogFilterView";
import ElementType1 from "~/components/pages/catalog/catalogView/ElementType1";
import ElementType2 from "~/components/pages/catalog/catalogView/ElementType2";
import ElementType3 from "~/components/pages/catalog/catalogView/ElementType3";

export default {
  name: "SectionView",
  components: { ElementType1, ElementType2, ElementType3, CatalogFilterView, CatalogFilterPanel },
  props: ['section', 'view', 'component', 'products'],
};
</script>
