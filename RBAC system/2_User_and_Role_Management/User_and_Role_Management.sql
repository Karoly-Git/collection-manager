/*
1.
Create a system that uses three types of roles: permissions, groups, and users.

    - Permissions will determine privileges based on tasks, such as reading and writing to a given table.
    - Groups will be collections of permissions, and represent a group of users.
    - Users represent specific people or applications, and join groups based on what their job is.


Let’s create a permission role first, for reading the customer table.
So that it’s easy to tell what type of role it is, we’ll call it p_customers_read.
*/

CREATE ROLE p_customers_read;

/*
2.
We’ve created a permission role, but it doesn’t actually do anything yet! Let’s fix this by using the GRANT command.
We want to give p_customers_read permission to SELECT items in the customers table.
*/

GRANT SELECT ON customers TO p_customers_read;
/* This gives us the command: GRANT SELECT ON customers TO p_customers_read; */

/*
3.
Create a role that will serve as a group for employees. Call the role g_employees.
*/

CREATE ROLE g_employees;

/*
4.
We want to give the g_employees group permission to READ from the customers table.
We already created a permission for this, so we just need to grant it to the group.
*/

GRANT p_customers_read TO g_employees;

/*
5.
Let’s make sure everything is working!
Create an example user account and add it to the employees group.
Like before, you’ll create a role, this time called u_example.
Because this is an account that actually logs in, 
we’ll want to add WITH LOGIN to the end of the CREATE ROLE command.
*/

CREATE ROLE u_example WITH LOGIN;

/*
6.
Now, add u_example to the g_employees group.
*/

GRANT g_employees TO u_example;

/*
7.
Finally, let’s implement some more default-deny behavior.
We can REVOKE public permissions,
so that users require the p_customers_read permission to read the customers table:
*/

REVOKE SELECT ON customers FROM PUBLIC;

