import app from  "./config/Server"

app.listen(process.env.PORT || 3000, () => console.log(`Server is running in address ${process.env.URL_APP}`))