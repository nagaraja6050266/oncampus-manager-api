const bodyParser = require("body-parser");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Port
const port = process.env.PORT;
app.listen(port, () => {
    console.log("App is running in port: ", port);
});

app.get("/", (req, res) => {
    res.send("App is working");
});

app.get("/students", async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        console.log(students);
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/students/:regno", async (req, res) => {
    const { regno } = req.params;
    try {
        const currStudent = await prisma.student.findUnique({
            where: { regno: BigInt(regno) },
        });
        if (!currStudent) {
            return res.status(404).json({ message: "Student Not Found" });
        }
        console.log(currStudent);
        res.json(currStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/students", async (req, res) => {
    const { regno, name, email, isPlaced, phoneNumber } = req.body;
    try {
        const newStudent = await prisma.student.create({
            data: {
                name,
                email,
                phoneNumber: phoneNumber ? BigInt(phoneNumber) : null,
                isPlaced,
                regno: BigInt(regno),
            },
        });
        res.json(newStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/students/:regno", async (req, res) => {
    const { regno } = req.params;
    const { name, email, phoneNumber, isPlaced } = req.body;
    try {
        const updatedStudent = await prisma.student.update({
            where: { regno: BigInt(regno) },
            data: { name, email, phoneNumber, isPlaced },
        });
        console.log(updatedStudent);
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/students/:regno", async (req, res) => {
    const { regno } = req.params;
    try {
        await prisma.student.delete({
            where: { regno: BigInt(regno) },
        });
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Company
app.get("/companies", async (req, res) => {
    try {
        const companies = await prisma.company.findMany();
        console.log(companies);
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/companies/:code", async (req, res) => {
    const { code } = req.params;
    try {
        const currCompany = await prisma.company.findUnique({
            where: { code: code },
        });
        if (!currCompany) {
            return res.status(404).json({ message: "Company Not Found" });
        }
        console.log(currCompany);
        res.json(currCompany);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/companies", async (req, res) => {
    const { code, name, email, poc, phoneNumber, hiringDepartments } = req.body;
    try {
        const newStudent = await prisma.student.create({
            data: {
                code,
                name,
                email,
                poc,
                phoneNumber: phoneNumber ? BigInt(phoneNumber) : null,
                hiringDepartments,
            },
        });
        res.json(newStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/companies/:code", async (req, res) => {
    const { code } = req.params;
    const { name, email, poc, phoneNumber, hiringDepartments } = req.body;
    try {
        const updatedCompany = await prisma.company.update({
            where: { code: code },
            data: { name, email, poc, phoneNumber, hiringDepartments },
        });
        console.log(updatedCompany);
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
