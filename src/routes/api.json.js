export const get = async () => {
  try {
    const response = await fetch(`http://rekrutacjartb.pl/developer/banner.json`);
    const result = await response.json();
    return { body: result }  
  } catch (error) {
    console.error(error)
  }
}