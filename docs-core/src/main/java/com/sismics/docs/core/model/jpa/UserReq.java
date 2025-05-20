package com.sismics.docs.core.model.jpa;

import com.google.common.base.MoreObjects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

/**
 * User entity.
 *
 * @author jtremeaux
 */
@Entity
@Table(name = "T_USER_REQUEST")
public class UserReq implements Loggable {
    /**
     * User ID.
     */
    @Id
    @Column(name = "USE_ID_C", length = 36)
    private String id;


    /**
     * User's username.
     */
    @Column(name = "USE_USERNAME_C", nullable = false, length = 50)
    private String username;

    /**
     * User's password.
     */
    @Column(name = "USE_PASSWORD_C", nullable = false, length = 100)
    private String password;


    /**
     * Email address.
     */
    @Column(name = "USE_EMAIL_C", nullable = false, length = 100)
    private String email;

    /**
     * Storage quota.
     */
    @Column(name = "USE_STORAGEQUOTA_N", nullable = false)
    private Long storageQuota;

    /**
     * status
     */
    @Column(name = "USE_STATUS_C")
    private String status;


    public String getId() {
        return id;
    }

    public UserReq setId(String id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserReq setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserReq setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserReq setEmail(String email) {
        this.email = email;
        return this;
    }


    public Long getStorageQuota() {
        return storageQuota;
    }

    public UserReq setStorageQuota(Long storageQuota) {
        this.storageQuota = storageQuota;
        return this;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("id", id)
                .add("username", username)
                .add("email", email)
                .toString();
    }

    @Override
    public String toMessage() {
        return username;
    }

    @Override
    public Date getDeleteDate() {
        return null;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
