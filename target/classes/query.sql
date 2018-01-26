 SELECT
  se1.SOF_ID,
  vpui.PORT_ID                                AS PORT_ID,
  l1.NAME                                     AS "PORT_NAME",
  b.TERMINAL_ID                               AS TERMINAL_ID,
  b.ID                                        AS BERTH_ID,
  l3.NAME                                     AS TERMINAL_NAME,
  l2.NAME                                     AS BERTH_NAME,
  l4.NAME                                     AS AREA_NAME,
  l4.ID                                       AS AREA_ID,
  se1.TIMESTAMP                               AS EOSP,
  se3.TIMESTAMP                               AS ALL_FAST,
  se5.TIMESTAMP                               AS COSP,
  vpui.IMO                                    AS IMO,
  vpui.VESSEL_NAME                            AS VESSEL_NAME,
  datediff(DAY, se1.TIMESTAMP, se5.TIMESTAMP) AS DAYS_IN_PORT,
  round(sh.deadweight * 0.975, 0)             AS QUANTITY,

  (
   SELECT
    TOP 1 u.DESTINATION
   FROM
    VESSEL_POSITION_UPDATE_ITEMS u
   WHERE
    u.DESTINATION IS NOT NULL
    AND imo = vpui.IMO
    AND u.modified > [se5].[TIMESTAMP]
   ORDER BY MODIFIED ASC)                     AS DESTINATION,

  (
   SELECT
    TOP 1 u.DESTINATION_TIDED
   FROM
    VESSEL_POSITION_UPDATE_ITEMS u

   WHERE
    u.DESTINATION_TIDED IS NOT NULL and upper(u.DESTINATION_TIDED) <> upper(l1.NAME)
    AND imo = vpui.IMO
    AND u.modified > [se5].[TIMESTAMP]
   ORDER BY u.MODIFIED ASC)                     AS DESTINATION_TIDED


 FROM dbo.SOF_EVENTS AS se1 INNER JOIN
  dbo.SOF_EVENTS AS se3 ON se1.SOF_ID = se3.SOF_ID
  INNER JOIN
  dbo.SOF_EVENTS AS se5 ON se1.SOF_ID = se5.SOF_ID
  INNER JOIN
  dbo.VESSEL_POSITION_UPDATE_ITEMS AS vpui ON se3.UPDATE_ITEM_ID = vpui.ID
  INNER JOIN
  dbo.BERTHS AS b ON se3.BERTH_ID = b.ID
  INNER JOIN

  dbo.LOCATIONS AS l1 ON vpui.PORT_ID = l1.ID
   INNER JOIN
  dbo.LOCATIONS AS l2 ON se3.BERTH_ID = l2.ID
  LEFT JOIN dbo.LOCATIONS AS l3 ON b.TERMINAL_ID = l3.ID
  LEFT JOIN dbo.LOCATIONS AS l4 ON b.PORT_AREA_ID = l4.ID
  INNER JOIN
  dbo.VT_SHIPS_TEMP AS sh ON sh.imo = vpui.IMO



 WHERE (se1.EVENT_ID = 1)
       AND (se3.EVENT_ID = 3) AND (se3.ROW_NUM = 3)
       AND (se5.EVENT_ID = 5) AND (se5.ROW_NUM = 5)
 AND  b.ID in (70000001360,
70000008238,
70000001363,
70000001365,
70000008478,
70000001364,
70000001362,
70000001359,
70000001358,
70000001573,
70000002654,
70000001367,
70000001366,
70000010695,
70000009356,
70000012541
)
       AND se1.TIMESTAMP > :from_date
       AND se1.TIMESTAMP < :to_date
       AND rtrim(ltrim(sh.my_vessel_type)) = 'bulk_carrier'
       AND sh.deadweight > 50000