import React, {useState, useContext} from "react";
import "./CodeSnippets.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function CodeSnippets() {
  const {isDark} = useContext(StyleContext);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const snippets = [
    {
      title: "Snowflake Query Optimization",
      language: "sql",
      description: "Clustering keys and result caching for cost optimization",
      code: `-- Before: 45s execution time
SELECT customer_id, SUM(order_amount) as total_spent
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY customer_id;

-- After: 3s with clustering + caching
ALTER TABLE orders CLUSTER BY (order_date);

-- Enable result caching
ALTER SESSION SET USE_CACHED_RESULT = TRUE;

-- Optimized query
SELECT customer_id, SUM(order_amount) as total_spent
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY customer_id;

-- Result: 93% faster, 40% lower warehouse costs`
    },
    {
      title: "dbt Incremental Macro",
      language: "sql",
      description: "Reusable macro for incremental model processing",
      code: `{% macro incremental_strategy() %}
  {% if is_incremental() %}
    WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
  {% endif %}
{% endmacro %}

-- Usage in model
{{ config(
    materialized='incremental',
    unique_key='id',
    on_schema_change='sync_all_columns'
) }}

SELECT 
    id,
    customer_id,
    order_total,
    updated_at
FROM {{ source('raw', 'orders') }}
{{ incremental_strategy() }}`
    },
    {
      title: "NextJS API Route with Snowflake",
      language: "javascript",
      description: "Serverless API connecting to Snowflake data warehouse",
      code: `import snowflake from 'snowflake-sdk';

export default async function handler(req, res) {
  const connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USER,
    password: process.env.SNOWFLAKE_PASSWORD,
    warehouse: 'COMPUTE_WH',
    database: 'ANALYTICS_DB'
  });

  try {
    await connection.connectAsync();
    
    const result = await connection.execute({
      sqlText: 'SELECT * FROM procurement_analytics LIMIT 100',
      complete: (err, stmt, rows) => {
        if (err) throw err;
        return rows;
      }
    });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.destroy();
  }
}`
    },
    {
      title: "Airflow DAG with SLA Monitoring",
      language: "python",
      description: "Production-grade DAG with alerting and retries",
      code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-eng',
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
    'sla': timedelta(hours=2),
    'on_failure_callback': alert_slack,
}

with DAG(
    'procurement_etl',
    default_args=default_args,
    schedule_interval='0 */6 * * *',
    catchup=False
) as dag:
    
    extract = PythonOperator(
        task_id='extract_orders',
        python_callable=extract_from_source
    )
    
    transform = PythonOperator(
        task_id='transform_data',
        python_callable=run_dbt_models
    )
    
    load = PythonOperator(
        task_id='load_to_warehouse',
        python_callable=load_to_snowflake
    )
    
    extract >> transform >> load`
    }
  ];

  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentSnippet = snippets[activeTab];

  return (
    <div className="code-snippets-container">
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode snippets-title" : "snippets-title"}>
          Code Snippets
        </h2>
        <p
          className={
            isDark
              ? "dark-mode snippets-subtitle subTitle"
              : "snippets-subtitle subTitle"
          }
        >
          Practical code examples from real projects
        </p>
      </Fade>

      {/* Tab Navigation */}
      <div className="snippet-tabs">
        {snippets.map((snippet, index) => (
          <button
            key={index}
            className={`snippet-tab ${activeTab === index ? "active" : ""} ${
              isDark ? "dark-mode" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {snippet.language.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Single Snippet Display */}
      <Fade key={activeTab} duration={500}>
        <div className={isDark ? "snippet-card dark-mode" : "snippet-card"}>
          <div className="snippet-header">
            <div className="snippet-info">
              <h3
                className={isDark ? "dark-mode snippet-title" : "snippet-title"}
              >
                {currentSnippet.title}
              </h3>
              <p
                className={
                  isDark
                    ? "dark-mode snippet-description"
                    : "snippet-description"
                }
              >
                {currentSnippet.description}
              </p>
            </div>
            <button
              className={`copy-btn ${
                copiedIndex === activeTab ? "copied" : ""
              } ${isDark ? "dark-mode" : ""}`}
              onClick={() => copyToClipboard(currentSnippet.code, activeTab)}
            >
              {copiedIndex === activeTab ? "✓ Copied" : "Copy"}
            </button>
          </div>

          <div className={isDark ? "code-block dark-mode" : "code-block"}>
            <div className="code-language">{currentSnippet.language}</div>
            <pre>
              <code>{currentSnippet.code}</code>
            </pre>
          </div>
        </div>
      </Fade>
    </div>
  );
}
