import React from 'react'
import { Link } from 'gatsby'

import Seo from '~/components/seo'

const SecondPage = () => (
  <>
    <Seo title="impressum" />
    <Link to="/">back</Link>
    <p><strong>Impressum</strong></p>
    <p>Informationspflicht laut § 5 TMG.</p>

    <p><strong>Copyright</strong></p>
    <p>All copyright featured or displayed on the site is owned by Provider. You may not modify any of the materials and you may not copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer or sell any information or work contained on the site. Except as authorised under the copyright laws, you are responsible for obtaining permission before reusing any copyrighted material that is available on the site. For purposes of these terms, the use of any such material on any other website or networked computer environment is prohibited. You will not remove any copyright, trademark or other proprietary notices from material found on the site. Liability</p>
    <p>Your use of the site is at your own risk. Where conditions and warranties implied by applicable law cannot be excluded, Provider limits its liability where and to the extent it is entitled to do so. Otherwise, neither Provider, nor any of its affiliates, officers or directors nor any of its agents or any other party involved in creating, producing or delivering the site will be liable for any direct, indirect, special, consequential or other damages that result from the use of, or the inability to use, the materials on the site, including damages caused by viruses or any incorrectness or incompleteness of the information on the site, or the performance of the products.</p>
  </>
)

export default SecondPage
