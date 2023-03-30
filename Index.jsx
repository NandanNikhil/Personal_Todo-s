import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Index() {
    const [data1, setdata1] = useState({ name: "", desc: "", priority: "" })
    const [z, setz] = useState([])
    const [id, setid] = useState({ name: "", desc: "", priority: "" })
    let d = []
    const x = async () => {
        const y = await axios.post("http://localhost:5000/Todos", data1)
        // console.log(y.data);
        getData()


    }
    const getData = async () => {
        const { data } = await axios.get("http://localhost:5000/Todos")
        setz(data);
    }
    const deleteid = async (item) => {
        const result = await axios.delete(`http://localhost:5000/Todos/${item.id}`)
        getData();

    }
    const updateTodos = async (item) => {
        const result = await axios.put(`http://localhost:5000/Todos/${item.id}`, item)
        getData()

    }
    useEffect(() => {
        getData()

    }, [])


    return <>

        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Todo</div>
                        <div class="card-body">
                            <div>
                                <label for="task" class="form-label">First task</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="task"
                                    placeholder="Enter Your task"
                                    onChange={e => { setdata1({ ...data1, name: e.target.value }) }}
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please add task.</div>
                            </div>
                            <div class="mt-2">
                                <label for="desc" class="form-label">Description</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="desc"
                                    placeholder="Enter task description"
                                    onChange={e => { setdata1({ ...data1, desc: e.target.value }) }}
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please add description</div>
                            </div>
                            <div class="mt-2">
                                <label for="priority"> Priority</label>
                                <select
                                    class="form-select"
                                    id="priority"
                                    onChange={e => { setdata1({ ...data1, priority: e.target.value }) }}
                                >
                                    <option selected>Select Priority</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>

                            </div>
                            <button type="submit"
                                class="btn btn-primary w-100 mt-3"
                                onClick={e => x()}
                            >
                                Add Todo
                            </button>
                        </div>
                    </div>
                    {/* <!-- output start --> */}
                    {
                        z.map(item => {
                            return <>

                                <div class="card mt-4">
                                    <div
                                        class="card-header d-flex justify-content-between"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#task1"
                                    >
                                        {item.name}
                                        {item.id}
                                        <div>
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-warning"
                                                data-bs-target="#editModal"
                                                data-bs-toggle="modal"
                                                onClick={e => setid(item)}
                                            >
                                                edit
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-danger"
                                                data-bs-target="#deleteModal"
                                                data-bs-toggle="modal"
                                                onClick={e => setid(item)}
                                            >
                                                delete
                                            </button>
                                        </div>
                                    </div>
                                    <div class="collapse" id="task1">
                                        <div class="card-body">{item.desc}</div>
                                    </div>
                                </div>
                            </>
                        }
                        )
                    }
                    {/* <!-- output end--> */}
                </div>
            </div>
        </div>

        {/* <!-- edit Modal --> */}
        <div class="modal fade" id="editModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModal">Edit Todo</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"

                        ></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label for="mtask" class="form-label">First task</label>
                            <input
                                type="text"
                                class="form-control"
                                id="mtask"
                                placeholder="Enter Your task"
                                value={id.name}
                                onChange={e => { setid({ ...id, name: e.target.value }) }}
                            />
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please add task.</div>
                        </div>
                        <div class="mt-2">
                            <label for="mdesc" class="form-label">Description</label>
                            <input
                                type="text"
                                class="form-control"
                                id="mdesc"
                                placeholder="Enter task description"
                                value={id.desc}
                                onChange={e => { setid({ ...id, desc: e.target.value }) }}
                            />
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please add description</div>
                        </div>
                        <div class="mt-2">
                            <label for="mpriority"> Priority</label>
                            <select class="form-select"
                                id="mpriority"
                                value={id.priority}
                                onChange={e => { setid({ ...id, priority: e.target.value }) }}
                            >
                                <option selected>Select Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <button type="button"
                            class="btn btn-primary w-100 mt-3"
                            data-bs-dismiss="modal"
                            onClick={e => { updateTodos(id) }}
                        >
                            Update Todo
                        </button>
                        <button
                            type="button"
                            class="btn mt-2 w-100 btn-outline-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Delete Modal --> */}
        <div class="modal fade" id="deleteModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">
                            Are you sure you want delete this todo ?
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body text-danger">
                        <p class="text-center text-muted mb-5">
                            You can delete this todo at any time. If you change your mind, you
                            might not be able to recover it
                        </p>
                        <div class="btn-group w-100">
                            <button
                                type="button"
                                class="btn btn-outline-danger"
                                data-bs-dismiss="modal"
                                onClick={e => deleteid(id)}


                            >Yes</button>
                            <button type="button"
                                class="btn btn-success"
                                data-bs-dismiss="modal"
                            >NO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
