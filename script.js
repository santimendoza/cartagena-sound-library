const stopAllSounds = () => {
  const audios = document.querySelectorAll("audio");
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  })
}

(function(){
  const soundTitles = document.querySelectorAll("#soundTitles div");
  soundTitles.forEach(sound => {
    const dataRef = sound.getAttribute("data-ref");
    if(!dataRef) {
      return;
    }
    sound.addEventListener("click", (e) => {
      const audio = document.querySelector(`audio[data-ref="${dataRef}"]`);
      stopAllSounds();
      audio.currentTime = 0;
      audio.play();
    })
  })
}())
