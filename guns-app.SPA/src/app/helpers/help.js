
export const fadeIn = (el) => {

    for(let i = 0; i < 100; i++)
    {
        setTimeout(() => {
            el.style.opacity += 0.01;
        }, 10)
    }
}

export const fadeOut = (el) => 
{
    for(let i = 0; i < 100; i++)
    {
        setTimeout(() => {
            el.style.opacity -= 0.01;
        }, 10)
    }
}

export const changeQuote = () =>
{
  //window.clearInterval(this.homeInterval);

    let quotes = [
    [`Speaking personally, you can have my gun, but you'll take my book when you pry my cold, dead fingers off of the binding`, `Stephen King`],
    [`It's all mirror, mirror on the wall because beauty is power the same way money is power the same way a gun is power.`, `Chuck Palahniuk, Invisible Monsters`],
    [`The fascination of shooting as a sport depends almost wholly on whether you are at the right or wrong end of the gun.`, `P.G. Wodehouse, The Adventures of Sally`],
    [`You are enough to drive a saint to madness or a king to his knees.`, `Grace Willows, To Kiss a King`],
    [`If someone has a gun and is trying to kill you, it would be reasonable to shoot back with your own gun.`, `The Dalai Lama`],
    [`We do not need guns and bombs to bring peace, we need love and compassion.`, `Mother Teresa, The Joy in Loving: A Guide to Daily Living`],
    [`Literary detection and firearms don't really go hand in hand; pen mighter than the sword and so forth.`, `Jasper Fforde, The Eyre Affair`],
    [`They have the guns, we have the poets. Therefore, we will win.`, `Howard Zinn`]
    ];

    let rand = Math.ceil(Math.random()*8) - 1;
    $('.quote').animate({opacity: 0}); 
    $('.blockquote-footer').animate({opacity: 0});
    $('.quote').delay(800)
    //.html(quotes[rand][0]);
    $('.blockquote-footer').delay(800)
    //.html(quotes[rand][1])
    $('.quote').delay(400).animate({opacity: 1});
    $('.blockquote-footer').delay(400).animate({opacity: 1});


//    $('.quote').fadeOut(300).delay(600).fadeIn(500);
//    $('.blockquote-footer').fadeOut(300).delay(600).fadeIn(500);

    setTimeout(() => 
    {
      $('.quote').html(quotes[rand][0]);
      $('.blockquote-footer').html(quotes[rand][1]);

    },401)
}