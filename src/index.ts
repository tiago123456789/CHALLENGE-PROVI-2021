import app from  "./config/Server"

app.listen(process.env.PORT, () => console.log(`Server is running in address ${process.env.URL_APP}`))