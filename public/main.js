const update = document.querySelector('#update-btn')
const deletebtn = document.querySelector('#delete-btn')

update.addEventListener('click', _=>{
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            name:'Stephen King',
            quote:'Get busy living or get busy dying.' 
        })
    })
})

deletebtn.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'stephen'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
  })
