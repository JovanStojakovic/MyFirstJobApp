package com.example.MojPrviPosao.dto;

import com.example.MojPrviPosao.model.Company;
import com.example.MojPrviPosao.model.JobType;
import com.example.MojPrviPosao.model.Status;
import com.example.MojPrviPosao.model.User;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

public class JobDTO {
    private long id;
    private String name;
    private LocalDate creationDate;
    private int plata;
    private String opisPosla;
    private JobType jobType;
    private LocalDate activeDate;
    private Status status;

    private long companyId;
    private long userId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public int getPlata() {
        return plata;
    }

    public void setPlata(int plata) {
        this.plata = plata;
    }

    public String getOpisPosla() {
        return opisPosla;
    }

    public void setOpisPosla(String opisPosla) {
        this.opisPosla = opisPosla;
    }

    public long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(long companyId) {
        this.companyId = companyId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public JobType getJobType() {
        return jobType;
    }

    public void setJobType(JobType jobType) {
        this.jobType = jobType;
    }

    public LocalDate getActiveDate() {
        return activeDate;
    }

    public void setActiveDate(LocalDate activeDate) {
        this.activeDate = activeDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
