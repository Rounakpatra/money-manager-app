package com.roni.money_manager.service;

import com.roni.money_manager.entity.ProfileEntity;
import com.roni.money_manager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ExpenseService expenseService;
    private final ProfileRepository profileRepository;
    private final IncomeService incomeService;
    private final EmailService emailService;

    @Value("${money.manager.frontend.url}")
    private String frontendUrl;


    @Scheduled(cron = "0 0 22 * * *", zone = "Asia/Kolkata")
    public void sendDailyIncomeExpenseReminder(){
        log.info("Job started: sendDailyIncomeExpenseReminder()");

        List<ProfileEntity> profiles=profileRepository.findAll();


        for(ProfileEntity profile:profiles){
            String body = "<div style='font-family:Arial,sans-serif;line-height:1.6;color:#333;'>"
                    + "<h2 style='color:#2c3e50;'>Hello " + profile.getFullName() + " 👋</h2>"
                    + "<p>Hope you’re having a great day! Just a quick nudge to keep your finances up to date.</p>"
                    + "<p>Please log today’s <b>income</b> and <b>expenses</b> in your Money Manager app.</p>"
                    + "<a href='" + frontendUrl + "' "
                    + "style='display:inline-block;margin-top:15px;padding:12px 24px;"
                    + "background:linear-gradient(135deg,#36d1dc,#5b86e5);"
                    + "color:#ffffff;text-decoration:none;border-radius:25px;"
                    + "font-weight:600;'>Open Money Manager</a>"
                    + "<p style='margin-top:30px;'>Cheers,<br><b>Money Manager Team</b></p>"
                    + "</div>";


            emailService.sendEmail(profile.getEmail(), "Daily reminder: Add your income and expenses", body);
        }

        log.info("Job completed: sendDailyIncomeExpenseReminder()");
    }


}
