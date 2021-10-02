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
  console.log(obj);
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
        category: obj.category,
        subTo: obj.subTo,
        index: obj.index,
      },
    },
  });
  return res.data;
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

const updateCategoryInUiOnDrop = (todos, setTodos, category, draggedItemId) => {
  const newTodos = todos.map((element) => {
    if (element._id === draggedItemId) {
      element.category = category.toLowerCase();
      return element;
    } else {
      return element;
    }
  });
  setTodos(newTodos);
};

const updateSubToInUiOnDrop = (todos, setTodos, id, draggedItemId) => {
  const newTodos = todos.map((element) => {
    if (element._id === draggedItemId) {
      element.subTo = id;
      return element;
    } else {
      return element;
    }
  });
  setTodos(newTodos);
};

const sortArrayIndexs = (array) => {
  return [...array].sort((a, b) => {
    return a.index - b.index;
  });
};

export {
  loginHandler,
  filterArrayCategory,
  updateTodo,
  updateNameInTodos,
  updateCategoryInUiOnDrop,
  updateSubToInUiOnDrop,
  sortArrayIndexs,
};
