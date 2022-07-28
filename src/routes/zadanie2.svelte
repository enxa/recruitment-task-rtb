<script>
  import { onMount } from 'svelte'

  let lerp = (start, end, t) => start * (1 - t) + end * t
  let offers = []
  let randomOffers = []
  let itemsAmount = 3
  let slider
  let sliderGrabbed = false
  let bannerShow = true

  let fetchOffers = async () => {
    try {
      let response = await fetch('/api.json')
      let result = await response.json()
      offers = result.offers
      generateRandomOffers(itemsAmount, offers.length)
    } catch(error) {
      console.error(error)
    }
  }

  let generateRandomOffers = (amount, max) => {
    let set = new Set()
    while(set.size < amount) set.add(Math.floor(Math.random() * max))
    randomOffers = [...set].map(randomNumber => offers[randomNumber])
  }

  let handleScroll = e => {
    slider.scrollLeft += e.deltaY / 10
  }

  let handleMousedown = () => {
    sliderGrabbed = true
    slider.style.cursor = 'grabbing'
  }

  let handleMouseup = () => {
    sliderGrabbed = false
    slider.style.cursor = 'grab'
  }

  let handleMouseleave = () => {
    sliderGrabbed = false
    slider.style.cursor = 'grab'
  }

  let handleMousemove = (e) => {
    if (sliderGrabbed) {
      slider.scrollLeft += e.movementX * -1
    }
  }

  onMount(() => fetchOffers())
</script>

{#if bannerShow}
  <aside class="banner">
    <div class="slider" 
      bind:this={slider} 
      on:wheel|preventDefault={handleScroll} 
      on:mousedown={handleMousedown} 
      on:mouseup={handleMouseup} 
      on:mouseleave={handleMouseleave}
      on:mousemove={handleMousemove}
    >
      {#if randomOffers}
        {#each randomOffers as offer}
        <div class="slide">
          <div class="offer">
            <img src={'https:' + offer.imgURL} alt={offer.name}>
            <div>
              <p>{offer.name}</p>
              <p class="price">{parseFloat(offer.price).toLocaleString().replace(',', '').replace('.', ',')} {offer.currency === 'PLN' ? 'zł' : offer.currency}</p>
              <a href="/">Check</a>
            </div>
          </div>
        </div>
        {/each}
      {/if}
    </div>
    <div class="logo">
      <span>꞊</span><img src="/logo_rtb.png" alt="RTB House logo">
    </div>
    <div class="close" on:click={() => bannerShow = false}>x</div>
  </aside>
{/if}

<style>
  .banner {
    width: 160px;
    height: 600px;
    border: 1px solid #d3d3d3;
    margin: 6px auto;
  }
    .slider {
      width: 160px;
      height: 520px;
      overflow: hidden;
      display: flex;
      cursor: grab;
      z-index: 10;
    }
      .slide {
        min-width: 100%;
        min-height: 100%;
        overflow: hidden;
        padding: 6px;
        border: 1px solid #d3d3d3;
        user-select: none;
        pointer-events: none;
      }
        .offer {
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
        }
        .offer img {
          height: 50%;
          object-fit: contain;
        }
        .offer div {
          height: 40%;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }
        .offer .price {
          font-weight: bolder;
        }
        .offer a {
          background: red;
          color: #fff;
          font-weight: bolder;
          padding: .5rem 2rem;
          transform: translateY(-1rem);
          pointer-events: auto;
        }

    .logo {
      position: absolute;
      margin: 8px 0;
      user-select: none;
    }
      .logo span {
        line-height: 0;
        transform: translate(-1px) scaleX(1.5);
        font-size: 2rem;
        color: #808080;
        position: relative;
        top: 40px;
        left: 4px;
      }
      .logo img {
        position: relative;
        top: 20px;
        left: 4px;
        max-width: 140px;
        user-select: none;
      }
    .close {
      position: relative;
      top: -520px;
      left: 140px;
      cursor: pointer;
    }
</style>

<section class="rim">
  <h6>Zadanie 2</h6>
  <ul>
    <li>
      Stwórz banner w formacie 160x600. Wylosuj z pliku JSON trzy oferty. Układ bannera ma być taki jak na załączonym przykładzie (banner.jpg). 
    </li>
    <li>
      Banner powinien być w formie slidera. 
    </li>
    <li>
      Dane powinny być zaczytywane z pliku JSON: http://rekrutacjartb.pl/developer/banner.json
    </li>
    <li>
      Logo: http://rekrutacjartb.pl/developer/images/logo_rtb.png
    </li>
  </ul>
</section>