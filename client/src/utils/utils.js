import axios from "axios";

const loginHandler = async (
  event,
  setUserData,
  isLoggedIn,
  setIsLoggedIn,
  email,
  password,
  setLoginMsg
) => {
  event.preventDefault();
  try {
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users/login",
      headers: {},
      data: { email, password },
    });
    const data = res.data;
    setUserData(data);
    if (res.status === 200) {
      setIsLoggedIn(!isLoggedIn);
      //take the user to the home page
      const toHome = document.getElementById("to-home");
      toHome.click();
    } else {
      setLoginMsg(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const filterArrayCategory = (array, parentCategory) => {
  const filterdArray = array.filter(
    (element) => element.category == parentCategory
  );
  return filterdArray;
};

const updateTodo = async (obj, userId) => {
  const res = await axios({
    method: "patch",
    url: "http://localhost:5000/api/v1/todos",
    headers: {},
    data: {
      id: userId,
      todo: {
        id: obj.id,
        name: obj.name,
        isDone: obj.isDone,
        category: obj.category.toLowerCase(),
      },
    },
  });
};

const updateNameInTodos = (id, name, todos, setTodos) => {
  setTodos(
    todos.map((element) => {
      if (element._id == id) {
        element.name = name;
        return element;
      } else {
        return element;
      }
    })
  );
};

export { loginHandler, filterArrayCategory, updateTodo, updateNameInTodos };
