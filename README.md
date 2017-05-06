# TablePlan
Table Plan Software For Your Wedding Dinner.

The purpose to develop this system is to help marriage couple

- To arrange seats better.
- To calculate received angpaus more efficiently.

#1

What is the table shape? Circle, Rectangular, Square.
What is the number of chairs per table? 

System will auto arrange the seats by looking at

- age
- gender
- group
- interest

If there is any invited person were unable to attend the wedding dinner, system is able to rearrange the seats with the minimum number of tables. Reduce number of tables will reduce the total cost.

#2

Marriage couple will know 

- What is the total cost? (Cost of no of tables + wine).
- What is the total received angpau?
- Who give the highest amount of angpau and who give 

------------------------------------------------------------------------------------------------------------------------

List of screens and high-level requirements.

Dashboard screen
- Determine table shape.
- Determine the number of people assigned to every table.

Invited people screen
- Insert invited people's information such as name, age, gender, what is their relationship with the wedded pair, hobby and interest.

Angpau screen
- Key in angpao amount of the invited people.

Costing screen
- Show the total cost of the wedding dinner.
- Show the amount of the total angapaus received.

Reporting screen
- Member report
- Table utilization report (How many empty seat?)

------------------------------------------------------------------------------------------------------------------------

List of technologies used.

FrontEnd
- Html5
- Css3
- Javascript + React

BackEnd
- Java8 + Spring Boot
- NoSql (MongoDb)

WebParameter / WebService
- JSON

Testing will use
- Selenium 2
- TestNG

------------------------------------------------------------------------------------------------------------------------

NoSql (MongoDb) collection structure

Every collection should have 5 mandatory fields : id, created_by, created_date, updated_by, updated_date.

Below is the list of collection of table plan.

- TableSetting
- Interest
- Relationship
- Dinner
- Guest
- GuestTable
- Schedule
- Photo
- Video
- User

Below list the detail of every collection.

TableSetting
- maxSeat
- shape

Interest
- Name

Relationship
- Name

Dinner
- Date
- Time From
- Time To
- Bride (User)
- Groom (User)
- Emcee (User)
- Angpau Collector (User)
- Video shooter (User)

Guest
- Name
- Chinese Name
- Age
- Interest
- Relationship

Table 
- tableNo
- positionX
- positionY

GuestTable
- Guest id (Guest)
- Table id (Table)
- Table seq

Schedule
- Time
- Activity

Photo
- Name
- Description

Video
- Name
- Description

User
- Name
- Role
