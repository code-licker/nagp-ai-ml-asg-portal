import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Assignment {
  id: string;
  title: string;
  badge: string;
  description: string;
  tags: string[];
  url: string;
}

export interface PortalConfig {
  userName: string;
  subtitle: string;
  assignments: Assignment[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName = 'Rohan Baranwal';
  subtitle = 'NAGP AI & Machine Learning Track';
  isDarkMode = false;
  assignments: Assignment[] = [
    {
      id: 'ds-churn',
      title: 'Assignment 1: Customer Churn Prediction',
      badge: 'Data Science & ML',
      description: 'End-to-end churn classification pipeline evaluating Decision Trees, GridSearchCV tuning, class imbalance correction, and ensemble models (Random Forest, Gradient Boosting) with a 76.5% recall and $493k financial ROI.',
      tags: ['Scikit-Learn', 'Decision Tree', 'GridSearchCV', 'Flask API', 'Docker'],
      url: 'http://localhost:5000'
    },
    {
      id: 'ai-travel',
      title: 'Assignment 2: AI Travel Planning Assistant',
      badge: 'Generative AI & Agents',
      description: 'Context-aware travel planner for Singapore combining a document-based RAG knowledge base (Chroma DB) with live Model Context Protocol (FastMCP) tools for real-time weather forecasts and currency conversion.',
      tags: ['LangChain', 'Google Gemini', 'FastMCP', 'Chroma RAG', 'Streamlit'],
      url: 'http://localhost:8501'
    }
  ];

  ngOnInit() {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.setTheme(true);
    } else {
      this.setTheme(false);
    }

    // Load dynamic config if available
    fetch('assets/config.json')
      .then(res => res.json())
      .then((config: PortalConfig) => {
        if (config.userName) this.userName = config.userName;
        if (config.subtitle) this.subtitle = config.subtitle;
        if (config.assignments && config.assignments.length) this.assignments = config.assignments;
      })
      .catch(() => {
        // Fallback to initial state
      });
  }

  toggleTheme() {
    this.setTheme(!this.isDarkMode);
  }

  setTheme(dark: boolean) {
    this.isDarkMode = dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  openAssignment(url: string) {
    window.open(url, '_blank');
  }
}
