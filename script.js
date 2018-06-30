(function () {
  const loadData = () => {
    const request = new XMLHttpRequest();
    request.open('get', 'data.json', false);
    request.send();
    if (request.status !== 200) {
      return [];
    }
    return JSON.parse(request.responseText);
  }

  const stopAllSounds = () => {
    const audios = document.querySelectorAll("audio");
    audios.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    })
  }

  const renderItems = () => {
    const soundItems = loadData();
    const mappedItems = soundItems.map(item => {
      const { text, code, file, thumbnail } = item;
      return `
      <div class="soundItem" data-ref="${code}">
        <div class="soundItemPicture" style="background-image: url(images/${thumbnail})">
          <img src="images/sound-icon.png" alt="sound icon" />
        </div>
        <div class="soundItemText">
          <span>${text}</span>
          <span>&nbsp</span>
          <span>&nbsp</span>
        </div>
      </div>
      <audio data-ref="${code}" src="media/${file}" type="audio/mp3"></audio>
      `;
    })

    document.querySelector('#soundTitles').innerHTML = mappedItems.join('');
  }

  const createEvent = () => {
    const soundTitles = document.querySelectorAll("#soundTitles div");
    soundTitles.forEach(sound => {
      const dataRef = sound.getAttribute("data-ref");
      if (!dataRef) {
        return;
      }
      sound.addEventListener("click", (e) => {
        const audio = document.querySelector(`audio[data-ref="${dataRef}"]`);
        stopAllSounds();
        audio.currentTime = 0;
        audio.play();
      })
    })
  }

  const init = () => {
    renderItems();
    createEvent();
  }

  init();
}())
