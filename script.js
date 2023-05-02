$(".form").on("submit", async (event) => {
  event.preventDefault();
  const response = await fetch(
    ` https://api.github.com/users/${$(".input-username").val()}`
  );
  const user = await response.json();
  $(".container").append(`
         <div class="user">
           <div class="profil">
             <img class="image-profil" src="${user.avatar_url}" alt="image-profil" />
             <h4 class="login">${user.login}(${user.location})</h4>
             <h3 class="name"><strong>${user.name}</strong></h3>
             <a href="${user.html_url}" target="_blanck" class="link-github">Voir sur Github</a>
           </div>
           <div class="line"></div>
           <div class="info">
           <h3><strong>Public Repos</strong></h3>
         </div>          
         </div>
         `);

  const repoResponse = await fetch(
    `https://api.github.com/users/${$(".input-username").val()}/repos`
  );
  const repo = await repoResponse.json();
  $(".info").empty();
  $(".info").append(
    repo
      .map(
        (repo) =>
          `<div><a class="site-name" target="_blank" href="https://${user.login}.github.io/${repo.name}">${repo.name}</a></div>`
      )
      .join("")
  );
});
