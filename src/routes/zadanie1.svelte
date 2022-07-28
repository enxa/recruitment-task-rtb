
<script>
  import { onMount } from 'svelte'
  
  let offers = []
  let randomOffers = []
  let itemsAmount = 4
  let changeItemInterval = 2000

  let fetchOffers = async () => {
    try {
      let response = await fetch('/api.json')
      let result = await response.json()
      offers = result.offers
      generateRandomOffers(itemsAmount, offers.length)
      loopOverOffers(0, changeItemInterval)
    } catch(error) {
      console.error(error)
    }
  }

  let generateRandomOffers = (amount, max) => {
    let set = new Set()
    while(set.size < amount) set.add(Math.floor(Math.random() * max))
    randomOffers = [...set].map(randomNumber => offers[randomNumber])
  }

  let loopOverOffers = (i, interval) => {
    setInterval(() => {
      if (i >= randomOffers.length) i = 0
        // console.log(i)
        randomOffers.forEach(offer => offer.active = false)
        randomOffers[i].active = true
        ++i
    }, interval)
  }

  onMount(() => fetchOffers())
</script>

<aside class="banner">
  {#if randomOffers.length}
    {#each randomOffers as offer}
      <div class={offer.active ? 'offer active' : 'offer disactive'}>
        <img src={'http:' + offer.imgURL} alt={offer.name}>
        <p>{parseFloat(offer.price).toLocaleString().replace(',', '').replace('.', ',')} {offer.currency === 'PLN' ? 'zł' : offer.currency}</p>
      </div>
    {/each}
    <div class="logo">
      <span>꞊</span><img src="http://rekrutacjartb.pl/developer/images/logo_rtb.png" alt="RTB House logo">
    </div>
  {/if}
</aside>

<style>
  .banner {
    width: 300px;
    height: 250px;
    border: 1px solid #d3d3d3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 2fr 1fr;
    gap: 2px;
    padding: 6px;
    margin: 6px auto;
  }
  .offer.disactive {
    border: 1px solid #d3d3d3;
    transition: 1s border ease-in-out;
  }
  .offer.active {
    border: 1px solid #ff0000;
    transition: 1s border ease-in-out;
  }
    .offer img {
      width: 100%;
      max-height: 70px;
      object-fit: contain;
      padding: 3px;
    }
    .offer p {
      font-size: 13px;
      font-weight: bold;
      line-height: .2px;
      text-align: center;
    }

  .logo {
    grid-column: 1/3;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 8px 0;
  }
    .logo span {
      line-height: 0;
      transform: translate(-40px, 2px) scaleX(1.5);
      font-size: 2rem;
      color: #808080;
    }
    .logo img {
      max-width: 200px;
    }
</style>

<section class="rim">
  <h6>Zadanie 1</h6>
  <ul>
    <li>
      Stwórz banner w formacie 300x250. Wylosuj z pliku JSON cztery oferty. Układ bannera ma być taki jak na załączonym przykładzie (banner.jpg). 
    </li>
    <li>
      Dodaj animacje "skaczącej ramki" - co dwie sekundy border oferty ma przeskakiwać na następną. Z ostatniej oferty ramka powinna przeskakiwać z powrotem na pierwszą.
    </li>
    <li>
      Obrazki i cena + waluta powinny być zaczytywane z pliku JSON: http://rekrutacjartb.pl/developer/banner.json
    </li>
    <li>
      Logo: http://rekrutacjartb.pl/developer/images/logo_rtb.png
    </li>
  </ul>
</section>


