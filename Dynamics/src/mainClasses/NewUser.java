
package mainClasses;

/**
 *
 * @author gerry
 */
public class NewUser {
    int user_id;
    String name, surname, workaddress, homeaddress, birthdate, gender;

    public int getUser_Id() {
        return user_id;
    }

    public void setUser_Id(int user_id) {
        this.user_id = user_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getHomeAddress() {
        return homeaddress;
    }

    public void setHomeAddress(String homeaddress) {
        this.homeaddress = homeaddress;
    }

    public String getWorkAddress() {
        return workaddress;
    }

    public void setWorkAddress(String workaddress) {
        this.workaddress = workaddress;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
