const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');

const text = `
  <h1>HEADER</h1>
  <p>Text</p>
`;
const t1 = `<table>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>

  </tr>

</table>`;
const table = `
<table border="1">
    <tr >
      <td ><strong>Verzekeraar</strong></td>
      <td ><strong>Wachttijd bij diefstal</strong></td>
      <td ><strong>Vergoeding voor vervangend vervoer?</strong></td>
    </tr>
    <tr >
      <td >ABN AMRO</td>
      <td >20 dagen</td>
      <td >20 dagen of maximaal 500 euro</td>
    </tr>
    <tr >
      <td >Aegon</td>
      <td >30 dagen</td>
      <td >14 dagen vervangende auto of 15 euro per dag</td>
    </tr>
    <tr >
      <td >Allianz</td>
      <td >30 dagen</td>
      <td >Volledig</td>
    </tr>
    <tr >
      <td >Allsecur</td>
      <td >30 dagen</td>
      <td >Volledig</td>
    </tr>
    <tr >
      <td >ANWB</td>
      <td >30 dagen</td>
      <td >Volledig</td>
    </tr>
    <tr >
      <td >AON Direct</td>
      <td >30 dagen</td>
      <td >30 dagen vervangende auto of 30 euro per dag</td>
    </tr>
    <tr >
      <td >a.s.r.</td>
      <td >30 dagen</td>
      <td >12,50 euro per dag tot max 375 euro</td>
    </tr>
    <tr >
      <td >Avéro Achmea</td>
      <td >20 dagen</td>
      <td >15 euro per dag</td>
    </tr>
    <tr >
      <td >BOVAG</td>
      <td >30 dagen</td>
      <td >5 dagen</td>
    </tr>
    <tr >
      <td >Budgio</td>
      <td >30 dagen</td>
      <td >12,50 euro per dag tot max 375 euro</td>
    </tr>
    <tr >
      <td >Centraal Beheer</td>
      <td >20 dagen</td>
      <td >15 euro per dag</td>
    </tr>
    <tr >
      <td >De Goudse</td>
      <td >30 dagen</td>
      <td >15 euro per dag</td>
    </tr>
    <tr >
      <td >Delta Lloyd</td>
      <td >30 dagen</td>
      <td >30 dagen vervangende auto of 15 euro per dag</td>
    </tr>
    <tr >
      <td >Ditzo</td>
      <td >30 dagen</td>
      <td >12,50 euro per dag tot max 375 euro</td>
    </tr>
    <tr >
      <td >FBTO</td>
      <td >30 dagen</td>
      <td >12 euro per dag</td>
    </tr>
    <tr >
      <td >Generali</td>
      <td >30 dagen</td>
      <td >25 euro per dag</td>
    </tr>
    <tr >
      <td >ING</td>
      <td >30 dagen</td>
      <td >12 euro per dag</td>
    </tr>
    <tr >
      <td >Inshared</td>
      <td >30 dagen</td>
      <td >Volledig</td>
    </tr>
    <tr >
      <td >Klaverblad</td>
      <td >30 dagen</td>
      <td >25 euro per dag tot max 750 euro</td>
    </tr>
    <tr >
      <td >Klik&amp;Go</td>
      <td >30 dagen</td>
      <td >12,50 euro per dag tot max 375 euro</td>
    </tr>
    <tr >
      <td >Nationale Nederlanden</td>
      <td >30 dagen</td>
      <td >Max 360 euro</td>
    </tr>
    <tr >
      <td >Nederlanden van Nu</td>
      <td >30 dagen</td>
      <td >27,50 per dag</td>
    </tr>
    <tr >
      <td >OHRA</td>
      <td >30 dagen</td>
      <td >30 dagen vervangende auto of 15 euro per dag</td>
    </tr>
    <tr >
      <td >Onna-onna</td>
      <td >30 dagen</td>
      <td >14 dagen vervangende auto of 15 euro per dag</td>
    </tr>
    <tr >
      <td >Polis Direct</td>
      <td >30 dagen</td>
      <td >15 euro per dag</td>
    </tr>
    <tr >
      <td >Reaal</td>
      <td >30 dagen</td>
      <td >25 tot 50 euro per dag (afhankelijk van waarde auto)</td>
    </tr>
    <tr >
      <td >SNS Bank</td>
      <td >30 dagen</td>
      <td >12 euro per dag</td>
    </tr>
    <tr >
      <td >Unigarant</td>
      <td >30 dagen</td>
      <td >Volledig, mits aanvullend verzekerd</td>
    </tr>
    <tr >
      <td >Univé</td>
      <td >30 dagen</td>
      <td >15 euro per dag</td>
    </tr>
    <tr >
      <td >Witgeld.nl</td>
      <td >30 dagen</td>
      <td >Max 360 euro</td>
    </tr>
    <tr >
      <td >Zelf.nl</td>
      <td >30 dagen</td>
      <td >12,50 euro per dag</td>
    </tr>
    <tr >
      <td >ZLM</td>
      <td >30 dagen</td>
      <td >15 euro per dag</td>
    </tr>
</table>

`;
const turndownService = new TurndownService();

turndownService.use(turndownPluginGfm.gfm);

const result = turndownService.turndown(t1);

console.log(result);
