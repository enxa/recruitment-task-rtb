export const get = async () => {
  try {
    const response = await fetch(`http://rekrutacjartb.pl/developer/banner.json`);
    const result = await response.json();
  
    return { 
      body: {
        "offers": [
          {
            "name": "Red dress M",
            "price": "89",
            "currency": "PLN",
            "imgURL": "//rekrutacjartb.pl/developer/images/offer1.jpg"
          },
          {
            "name": "Twisted",
            "price": "990",
            "currency": "PLN",
            "imgURL": "//rekrutacjartb.pl/developer/images/offer2.jpg"
          },
          {
            "name": "Circle Pendant White Gold-plated",
            "price": "79",
            "currency": "PLN",
            "imgURL": "//rekrutacjartb.pl/developer/images/offer3.jpg"
          },
          {
            "name": "Women",
            "price": "4000",
            "currency": "PLN",
            "imgURL": "//rekrutacjartb.pl/developer/images/offer4.jpg"
          },
          {
            "name": "T-shirt",
            "price": "100",
            "currency": "PLN",
            "imgURL": "//rekrutacjartb.pl/developer/images/offer5.jpg"
          },
          {
            "name": "Adidas Neo W56-234",
            "price": "129",
            "currency": "PLN",
            "imgURL": "//rekrutacjartb.pl/developer/images/offer6.jpg"
          }
        ],
        
      }
    }  
  } catch (error) {
    console.error(error)
  }
}