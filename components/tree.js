export default function (data) {
  const tree = document.querySelector("nav#tree")
  const menu = document.createElement("ul")

  //verifica se é o primeiro nível da árvore
  const firstLevel = data.filter(item => !item.parent)

  const getFirstLis = firstLevel.map(buildTree)
  getFirstLis.forEach(li => menu.append(li))

  function buildTree(item) {
    const li = document.createElement("li")
    li.innerHTML = item.name

    const children = data.filter(child => child.parent === item.id)

    if (children.length > 0) {
      //adicionando click para abrir menu
      li.addEventListener("click", event => {
        event.stopPropagation()
        event.target.classList.toggle("open")
      })

      //adiciona classe identificadora de filhos
      li.classList.add("has-children")

      //Fazendo o sub menu aos filhos
      const subMenu = document.createElement("ul")
      children.map(buildTree)
        .forEach(li => subMenu.append(li))
      li.append(subMenu)
    }
    return li
  }
  tree.append(menu)
}

