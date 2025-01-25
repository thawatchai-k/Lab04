import express from 'express';

const app = express()
const port = 3000

// GET, POST, PUT, DELETE
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// http://localhost:3000/toDoLists/u100/ORD100
app.get('/toDoLists/:userId/:orderId', (req, res) => {
    let myData = "<h1>My Profile</h1>";
    myData+= "<strong>User ID:</strong> "+req.params.userId+"<br/>";
    myData+= "<strong>Order ID:</strong> "+req.params.orderId+"<br/>";
    res.set('Content-type', 'text/html');
    res.send(myData);
})

app.post('/', (req, res) => {
  res.send('Hello World in POST method!')
})

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})
