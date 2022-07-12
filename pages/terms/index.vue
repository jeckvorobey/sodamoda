<template>
  <section class="legal-section">
    <div class="section-container">
      <h2>Legal Terms</h2>
      <p>Confidence, like art, never comes from having all the answers it comes from being open to all the questions.</p>
      <h4>Terms and legal conditions</h4>
      <p>
        BULVIN are given to the best CSS websites in the world from the top designers, agencies and bloggers working today. <br>
        Winners receive recognition, prestige and media presence.
      </p>
      <p>
        By accessing our website and/or using our services, you agree to be bound by the following terms and conditions.
      </p>
      <p>
        If you do not agree to be bound by these terms, you should leave the website immediately and refrain from using our services.
      </p>
      <p>
        Any changes to this policy will be posted on this page. By accessing our website after such changes are posted, you indicate your acceptance of the revised policy. You should check this page regularly to ensure you are always aware of our terms and conditions.
      </p>
      <p>
        BULVIN does not guarantee the accuracy, reliability or continuity of any of the information on this website. The content and services offered on this website are for general purposes only and are not intended to address your individual requirements.
      </p>
      <p>
        All material contained on this website is the property of BULVIN. All rights are reserved and any unauthorized use or reproduction is strictly prohibited. Our content may not be used for commercial purposes unless expressly authorized by BULVIN.
      </p>
      <p>
        Websites featured on our site remain the intellectual property of their creators. However, by submitting a site, you agree to its publication on our site and reproduction in other publications produced by BULVIN.
      </p>
      <p>
        BULVIN accepts no responsibility for the information and/ or content provided on any of our winners' websites.
      </p>
      <p>
        BULVIN accepts no responsibility for changes made to any winning site subsequent to its appearance on BULVIN. Altered designs and/ or content may be removed from our database with immediate effect if it is felt that the site in its current form does not meet our standards and criteria.
      </p>
      <h4>
        Evaluation system
      </h4>
      <p>
        By submitting a site for an BULVIN, you confirm that you have read and accept the following and agree to accept the outcome of the vote in accordance with our evaluation system and criteria as outlined below.
      </p>
      <p>
        Our intention is to be fair when evaluating each website submitted for an BULVIN, so we’ve created an evaluation system based on 4 criteria: Design, Creativity, Usability and Content.
      </p>
      <h4>
        Directory and Submission Fees
      </h4>
      <p>
        a. By subscribing to the BULVIN directory and using the other services offered by BULVIN, you agree to the current terms and conditions of the site.
      </p>
      <p>
        b. There are three directory plans available:
      </p>
      <p>
        Basic: No annual cost. Features include: adding your profile to one directory in one country.
      </p>
      <p>
        Professional: Annual cost of €150 ($165). Features include: adding your profile to 3 categories in one country.
      </p>
      <p>
        International: Annual cost of €1500 ($1750). Features include: adding your profile to 5 categories, worldwide.
      </p>
      <p>
        c. You can opt to upgrade or downgrade your service agreement to any other contract agreement that BULVIN is currently offering for sale at any time during your contract term. In the event of a contract downgrade, a discount credit will be issued to your BULVIN account for the difference in the cost of the two contracts over the remainder of your original contract term. This credit can be applied to future months of service with BULVIN, and is in no way transferable to a cash refund.
      </p>
      <p>
        d. At the end of the contract term, your contract will automatically renew for an additional contract term until explicitly cancelled by you. Cancellation must be issued via your user panel or via BULVIN customer support. Any cancellation issued via your user panel must be completed at least one (1) working day prior to the end of the contract term. Any cancellation carried out viaBULVIN customer support must be carried out at least three (3) working days prior to the end of the contract term to allow for adequate processing time.
      </p>
      <p>
        e. Only Services and features clearly indicated as "free" are free or without charge. It is not the responsibility of BULVIN to provide free support to you in the use and operation of BULVIN.
      </p>
      <p>
        f. If you purchase any Services that we offer for a Fee, you agree to both BULVIN and our third party service providers to store your payment information. You give express permission for us to charge you for (i) a monthly Fee for any applicable Services, billed on a monthly basis, (ii) any other Fees for Services you may purchase, and (iii) any applicable taxes in connection with your use of the Services to the payment card you provide and to reimburse us for all collection costs and interest for any overdue amounts. If the card information you provide expires and you do not provide new card information, or cancel your bank account, you authorize us to continue billing you and you agree to remain responsible for any uncollected Fees.
      </p>
    </div>
  </section>
</template>
<script>
import global from "~/mixins/global";

export default {
  name: "Terms",
  layout: 'site',
  mixins: [global],
  methods: {},
  beforeRouteLeave (to, from, next) {
    this.showLoader()
    next()
  },
  mounted() {
    //this.hideLoader(1000)
  },
  head () {
    return {
      bodyAttrs: {
        class: 'legal-page'
      }
    }
  },
};
</script>
