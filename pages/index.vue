<template>

  <v-img src="/page2/img/logo.png" center />

  <h1>Willkommen bei Industria Solares</h1>

  <h2>Solarenergie - der Weg in eine CO2-neutrale Zukunft</h2>

  <p>
    Der Ausstoß von CO2 ist eines der größten Umweltprobleme, mit denen die Welt heute konfrontiert ist.
    Eine wichtige Quelle für CO2-Emissionen ist die Erzeugung von Strom aus fossilen Brennstoffen wie Kohle, Öl und Gas.
    Eine Lösung für dieses Problem ist die Umstellung auf erneuerbare Energien, wie zum Beispiel Solarenergie.
    Solarenergie ist eine saubere und unerschöpfliche Energiequelle, die aus der Kraft der Sonnenstrahlung gewonnen
    wird.
    Sie hat keine direkten Emissionen und trägt somit nicht zum Klimawandel bei.
  </p>

  <p>
    In den letzten Jahren hat sich die Technologie für Solarenergie stark verbessert und die Kosten für die Installation
    von Solaranlagen sind gesunken.
    Eine wichtige Möglichkeit zur Reduzierung des CO2-Ausstoßes ist die Nutzung von Solarenergie zur Stromerzeugung.
    Durch den Einsatz von Solaranlagen auf Dächern von Wohnhäusern und Gebäuden sowie in großen Freiflächenanlagen kann
    eine beträchtliche Menge an CO2 eingespart werden.
    Es gibt auch die Möglichkeit der Nutzung von Solarthermie, welche dazu dient Wärmeenergie durch die Nutzung von
    Solarenergie zu erzeugen.
  </p>

  <v-img src="/page2/img/co2.png" class="header-img" />
  <v-divider />

  <h2>Solaranlagen - Ihre persönliche Energieversorgung</h2>
 
  <p>
    Sie interessieren sich für Solar, sind jedoch unschlüssig, welche Art der Finanzierung und welche Komponenten die
    richtigen für Sie sind?
    Keine Sorge, wir beraten Sie objektiv und bedarfsorientiert bezüglich der Vorzüge beim Kauf und Leasing und bieten
    Ihnen eine komplette Lösung von der Beratung, Planung bis zur Installation und Wartung.
    Als zuverlässiger Solar-Anbieter stehen wir Ihnen jederzeit zur Seite.
    Entdecken Sie jetzt die Solar-Lösung, die perfekt zu Ihnen passt.
  </p>

  <p>
    Interessieren Sie sich für die Vorteile einer Solaranlage und möchten von günstigen Energiekosten profitieren?
    Unsere fachkundigen Berater unterstützen Sie bei der Auswahl der passenden PV-Komponenten und beantworten all Ihre
    Fragen rund um die Photovoltaik.
    Von der ersten Anfrage bis zur Installation und Wartung sind Sie bei uns in den besten Händen.
    Eine Solaranlage für Ihr Zuhause ohne eigene Kosten und ohne Risiko. Profitieren auch Sie von günstigen
    Energiekosten durch unsere fachkundige Beratung und Unterstützung.
  </p>

  <v-img src="/page2/img/solar.png" class="header-img" />
  <v-divider />

  <h2>Industria Solares - zusammen in die Zukunft</h2>

  <p>
    Industria-Solares bietet Ihnen eine komplette Lösung für Solaranlagen.
    Wir setzen auf hochwertige und langlebige PV-Module, die nicht nur zur Energieeffizienz beitragen, sondern auch
    einen großen Beitrag leisten, die CO2-Belastung durch fossile Energieträger zu reduzieren.
  </p>

  <p>
    Unser Team von erfahrenen Mitarbeitern unterstützt Sie von Anfang an, vom ersten Beratungsgespräch bis hin zur
    Montage Ihrer Anlage.
    Wir bieten Ihnen flexible Finanzierungsmöglichkeiten für Ihre Solaranlage, darunter Attraktive Ratenzahlungsmodelle,
    Leasing oder Kauf.
    So können Sie die für Sie am besten geeignete Option auswählen und Ihre Solaranlage in Ihr Budget integrieren.
    Wir garantieren Ihnen eine sichere und zuverlässige Umsetzung Ihres Projekts welches wir passend zu Ihren
    Bedürfnissen und Wünschen umsetzen.
  </p>

  <p>
    Unser Service beinhaltet nicht nur eine Professionelle Beratung und die Montage Ihrer Anlage, sondern auch eine
    umfassende Wartung, um die Lebensdauer und Leistung Ihrer Solaranlage zu maximieren.
    So können Sie sicher sein, dass Sie lange Freude an den Vorteilen Ihrer Anlage haben werden.
    Entscheiden Sie sich für Vertrauen, Zuverlässigkeit und erneuerbare Energien und wählen Sie Industria-Solares als
    Ihren Partner für Ihre Solaranlage.
    Profitieren Sie von unserem Angebot an Dienstleistungen und Produkten und erleben Sie den Vorteil einer Solaranlage
    mit unserer Unterstützung.
  </p>

  <v-divider />

  <h2>Kalkulator</h2>

  <p>Hier Kommen Sie zu unserem Solar-Effizienzkalkulator.</p>

  <NuxtLink to="/calculator">
    <v-btn color="primary" dark>zum Kalkulator</v-btn>
  </NuxtLink>

  <v-divider />
</template>


<script lang="ts" setup>

</script>


<style scoped>
h1 {
  text-align: center;
  margin: 0 0 1em 0;
}

h2 {
  text-align: center;
  margin: 0 0 1em 0;
}

p {
  text-align: justify;
  margin: 0 0 1em 0;
}

.v-divider {
  margin: 2em 0 5em 0;
}

.v-img {
  margin: 0 0 1em 0;
}

.header-img {
  width: 50%;
  height: 50%;
  left: 25%;
}

.v-btn {
  margin: 0 0 1em 0;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
