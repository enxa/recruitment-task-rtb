<script>
  let expirationDate = '2022/08/04'
  let targetDate = null
  let currentDate = null
  let timespan = null
  let timer = null

  let seconds = ''
  let minutes = ''
  let hours = ''
  let days = ''

  let second = 1000
  let minute = second * 60
  let hour = minute * 60
  let day = hour * 24

  let countDown = () => {
    timer = setInterval(() => {
      targetDate = new Date(expirationDate)
      currentDate = new Date()
      timespan = targetDate - currentDate

      if (timespan <=0 ) clearInterval(timer)

      days =    Math.floor((timespan) / day)
      hours =   Math.floor((timespan % day) / hour)
      minutes = Math.floor((timespan % hour) / minute)
      seconds = Math.floor((timespan % minute) / second)
    }, 1000)
  }

  countDown()
</script>

<aside class="counter rim">
  {#if timespan}
    <h5>Do końca pozostało: {days <= 10 ? `0${days}` : days}-{hours <= 10 ? `0${hours}` : hours}-{minutes <= 10 ? `0${minutes}` : minutes}-{seconds <= 10 ? `0${seconds}` : seconds}</h5>
  {/if}
</aside>

<section class="rim">
  <h6>Zadanie 3</h6>
  <ul>
    <li>
      Zaprogramuj counter, który zlicza ilość czasu pozostałego np. do końca promocji (od dnia dzisiejszego do analogicznej daty tydzień później) w formie 
      "Do końca pozostało: DD-HH-MM".
    </li>
    <li>
      Dodaj warunki, które wyłączą ilość dni/godzin w momencie kiedy wynoszą 0.
    </li>
  </ul>
</section>