import React from 'react'
import { Link as LinkTo } from 'gatsby'
import Seo from '~/components/seo'
import styled from '@emotion/styled'
import { breakpoint } from '../utils/styles'

const Impressum = styled.div`
  margin-top: 80px;

  p {
    margin-top: 10px;
    font-size: 15px;

    @media ${breakpoint.mobile} { 
      font-size: 14px;
    }
  }

  p strong {
    margin-top: 30px;
    display: block;
    font-family: IBM Plex Serif;
  }
`
const Link = styled(LinkTo)`
    font-family: 'IBM Plex Sans';
    border: 1px solid black;
    padding: 15px 30px;
    background-color: transparent;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    margin-top: 30px;

    @media ${breakpoint.desktop} { 
      margin-top: 20px;
    }

    &:hover span {
        transform: translateY(-160%);
    }
`

const Span = styled.span`
    position: relative;
    display: inline-block;
    transition: transform .3s;

&::before {
    content: attr(data-hover);
    position: absolute;
    top: 160%;
    transform: translate3d(0, 0, 0);
    }
`

const SecondPage = () => (
  <Impressum>
    <Seo title="impressum" />
    <div>
      <p><strong>Impressum & Terms</strong></p>
      <p>Informationspflicht laut § 5 TMG.</p>
      
      <p>Jessica Schäfer</p>
      <p>email@shopify.com</p>
      
      <p>EU-Streitschlichtung - Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die Online-Streitbeilegungsplattform (OS-Plattform) informieren. Verbraucher haben die Möglichkeit, Beschwerden an die Online Streitbeilegungsplattform der Europäischen Kommission unter http://ec.europa.eu/odr?tid=321264491 zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in unserem Impressum. Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <p><strong>Haftung für Inhalte dieser Website</strong></p>
      <p>Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen uns korrekte und aktuelle Informationen bereitzustellen. Laut Telemediengesetz (TMG) §7 (1) sind wir als Diensteanbieter für eigene Informationen, die wir zur Nutzung bereitstellen, nach den allgemeinen Gesetzen verantwortlich. Leider können wir keine Haftung für die Korrektheit aller Inhalte auf dieser Webseite übernehmen, speziell für jene die seitens Dritter bereitgestellt wurden. Als Diensteanbieter im Sinne der §§ 8 bis 10 sind wir nicht verpflichtet, die von ihnen übermittelten oder gespeicherten Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
      <p>Unsere Verpflichtungen zur Entfernung von Informationen oder zur Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen aufgrund von gerichtlichen oder behördlichen Anordnungen bleiben auch im Falle unserer Nichtverantwortlichkeit nach den §§ 8 bis 10 unberührt. Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitte wir Sie uns umgehend zu kontaktieren, damit wir die rechtswidrigen Inhalte entfernen können. Sie finden die Kontaktdaten im Impressum.</p>

      <p><strong>Haftung für Links auf dieser Website</strong></p>
      <p>Unsere Webseite enthält Links zu anderen Webseiten für deren Inhalt wir nicht verantwortlich sind. Haftung für verlinkte Websites besteht für uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten und haben, uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen sind und wir Links sofort entfernen würden, wenn uns Rechtswidrigkeiten bekannt werden. Wenn Ihnen rechtswidrige Links auf unserer Website auffallen, bitte wir Sie uns zu kontaktieren. Sie finden die Kontaktdaten im Impressum.</p>

      <p><strong>Urheberrechtshinweis</strong></p>
      <p>Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht der Bundesrepublik Deutschland. Bitte fragen Sie uns bevor Sie die Inhalte dieser Website verbreiten, vervielfältigen oder verwerten wie zum Beispiel auf anderen Websites erneut veröffentlichen. Falls notwendig, werden wir die unerlaubte Nutzung von Teilen der Inhalte unserer Seite rechtlich verfolgen.</p>
      <p>Sollten Sie auf dieser Webseite Inhalte finden, die das Urheberrecht verletzen, bitten wir Sie uns zu kontaktieren. Bildernachweis Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt. Die Bilderrechte liegen bei den folgenden Fotografen und Unternehmen: Fotograf Mustermann</p>

      <p><strong>Datenschutzerklärung</strong></p>
      <p>Datenschutz: Wir haben diese Datenschutzerklärung (Fassung 21.02.2021-321264491) verfasst, um Ihnen gemäß der Vorgaben der Datenschutz-Grundverordnung (EU) 2016/679 zu erklären, welche Informationen wir sammeln, wie wir Daten verwenden und welche Entscheidungsmöglichkeiten Sie als Besucher dieser Webseite haben.</p>
      <p>Datenschutzerklärungen klingen für gewöhnlich sehr technisch. Diese Version soll Ihnen hingegen die wichtigsten Dinge so einfach und klar wie möglich beschreiben. Soweit es möglich ist, werden technische Begriffe leserfreundlich erklärt. Außerdem möchten wir vermitteln, dass wir mit dieser Website nur dann Informationen sammeln und verwenden, wenn eine entsprechende gesetzliche Grundlage gegeben ist. Das ist sicher nicht möglich, wenn man möglichst knappe, technische Erklärungen abgibt, so wie sie im Internet oft Standard sind, wenn es um Datenschutz geht. Ich hoffe Sie finden die folgenden Erläuterungen interessant und informativ und vielleicht ist die eine oder andere Information dabei, die Sie noch nicht kannten. Wenn trotzdem Fragen bleiben, möchten wir Sie bitten den vorhandenen Links zu folgen und sich weitere Informationen auf Drittseiten anzusehen, oder uns einfach eine E-Mail zu schreiben. Unsere Kontaktdaten finden Sie im Impressum.</p>
      <p><small>Quelle: Erstellt mit dem Datenschutz Generator von AdSimple in Kooperation mit bauenwir.de</small></p>
    </div>
    <Link to="/">
      <Span data-hover="Take me Back">Take me Back</Span>
    </Link>
  </Impressum>
)

export default SecondPage
